import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ScrapedRecipe {
  title?: string;
  description?: string;
  ingredients?: string;
  instructions?: string;
  image?: string;
}

export class ScrapeService {
  async scrapeRecipe(url: string): Promise<ScrapedRecipe> {
    try {
      // Fetch HTML content
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'sk,cs;q=0.9,en;q=0.8',
        },
        timeout: 10000,
      });

      const html = response.data;
      const $ = cheerio.load(html);

      // Try to find structured data first (Schema.org Recipe)
      let recipe = this.extractSchemaOrgRecipe($);

      if (recipe.title) {
        return recipe;
      }

      // Fallback to HTML parsing
      recipe = this.extractFromHtml($);

      return recipe;
    } catch (error) {
      console.error('Error scraping recipe:', error);
      throw new Error('Nepodarilo sa načítať recept z URL');
    }
  }

  private extractSchemaOrgRecipe($: cheerio.CheerioAPI): ScrapedRecipe {
    const recipe: ScrapedRecipe = {};

    // Look for JSON-LD structured data
    $('script[type="application/ld+json"]').each((_, element) => {
      try {
        const json = JSON.parse($(element).html() || '');
        const recipeData = this.findRecipeInJson(json);

        if (recipeData) {
          recipe.title = recipeData.name;
          recipe.description = recipeData.description;
          recipe.image = Array.isArray(recipeData.image)
            ? recipeData.image[0]
            : (typeof recipeData.image === 'object' ? recipeData.image.url : recipeData.image);

          // Parse ingredients
          if (recipeData.recipeIngredient) {
            recipe.ingredients = recipeData.recipeIngredient
              .map((ing: string) => `• ${ing.trim()}`)
              .join('\n');
          }

          // Parse instructions
          if (recipeData.recipeInstructions) {
            recipe.instructions = this.parseInstructions(recipeData.recipeInstructions);
          }
        }
      } catch (e) {
        // JSON parse error, skip
      }
    });

    return recipe;
  }

  private findRecipeInJson(json: any): any {
    if (!json) return null;

    // Direct Recipe type
    if (json['@type'] === 'Recipe') {
      return json;
    }

    // Array of items
    if (Array.isArray(json)) {
      for (const item of json) {
        const found = this.findRecipeInJson(item);
        if (found) return found;
      }
    }

    // Graph structure
    if (json['@graph']) {
      return this.findRecipeInJson(json['@graph']);
    }

    return null;
  }

  private parseInstructions(instructions: any): string {
    if (typeof instructions === 'string') {
      return instructions;
    }

    if (Array.isArray(instructions)) {
      return instructions
        .map((inst, index) => {
          if (typeof inst === 'string') {
            return `${index + 1}. ${inst.trim()}`;
          }
          if (inst.text) {
            return `${index + 1}. ${inst.text.trim()}`;
          }
          if (inst['@type'] === 'HowToStep') {
            return `${index + 1}. ${(inst.text || inst.name || '').trim()}`;
          }
          if (inst['@type'] === 'HowToSection') {
            const sectionSteps = this.parseInstructions(inst.itemListElement);
            return `**${inst.name}**\n${sectionSteps}`;
          }
          return '';
        })
        .filter(Boolean)
        .join('\n');
    }

    return '';
  }

  private extractFromHtml($: cheerio.CheerioAPI): ScrapedRecipe {
    const recipe: ScrapedRecipe = {};

    // Remove unwanted elements
    $('script, style, nav, header, footer, aside, .comments, .sidebar, .ad, .advertisement').remove();

    // Extract title
    recipe.title = this.extractTitle($);

    // Extract image
    recipe.image = this.extractImage($);

    // Extract description
    recipe.description = this.extractDescription($);

    // Extract ingredients
    recipe.ingredients = this.extractIngredients($);

    // Extract instructions
    recipe.instructions = this.extractInstructions($);

    return recipe;
  }

  private extractTitle($: cheerio.CheerioAPI): string {
    // Try common title selectors
    const titleSelectors = [
      'h1.recipe-title',
      'h1.entry-title',
      'h1[itemprop="name"]',
      '.recipe-header h1',
      '.recipe-name',
      'article h1',
      'h1',
    ];

    for (const selector of titleSelectors) {
      const title = $(selector).first().text().trim();
      if (title && title.length > 3 && title.length < 200) {
        return title;
      }
    }

    // Fallback to page title
    const pageTitle = $('title').text().split('|')[0].split('-')[0].trim();
    return pageTitle || '';
  }

  private extractImage($: cheerio.CheerioAPI): string {
    // Try Open Graph image first
    const ogImage = $('meta[property="og:image"]').attr('content');
    if (ogImage) return ogImage;

    // Try common image selectors
    const imageSelectors = [
      'img[itemprop="image"]',
      '.recipe-image img',
      '.recipe-photo img',
      'article img',
      '.entry-content img',
    ];

    for (const selector of imageSelectors) {
      const src = $(selector).first().attr('src');
      if (src && (src.startsWith('http') || src.startsWith('//'))) {
        return src.startsWith('//') ? `https:${src}` : src;
      }
    }

    return '';
  }

  private extractDescription($: cheerio.CheerioAPI): string {
    // Try meta description
    const metaDesc = $('meta[name="description"]').attr('content') ||
                     $('meta[property="og:description"]').attr('content');

    if (metaDesc && metaDesc.length > 20) {
      return metaDesc.substring(0, 500);
    }

    // Try common description selectors
    const descSelectors = [
      '[itemprop="description"]',
      '.recipe-description',
      '.recipe-summary',
      '.entry-content > p:first-of-type',
    ];

    for (const selector of descSelectors) {
      const desc = $(selector).first().text().trim();
      if (desc && desc.length > 20 && desc.length < 1000) {
        return desc;
      }
    }

    return '';
  }

  private extractIngredients($: cheerio.CheerioAPI): string {
    const ingredients: string[] = [];

    // Try common ingredient selectors
    const ingredientSelectors = [
      '[itemprop="recipeIngredient"]',
      '.recipe-ingredients li',
      '.ingredients li',
      '.ingredient-list li',
      '.wprm-recipe-ingredient',
      'ul.ingredients li',
    ];

    for (const selector of ingredientSelectors) {
      $(selector).each((_, el) => {
        const text = $(el).text().trim();
        if (text && text.length > 1 && text.length < 200) {
          ingredients.push(`• ${text}`);
        }
      });

      if (ingredients.length > 0) break;
    }

    // Fallback: look for section with ingredient keywords
    if (ingredients.length === 0) {
      const sectionKeywords = ['ingredien', 'suroviny', 'potrebujeme', 'zloženie'];

      $('h2, h3, h4, strong, b').each((_, el) => {
        const headerText = $(el).text().toLowerCase();
        if (sectionKeywords.some(kw => headerText.includes(kw))) {
          const nextList = $(el).nextAll('ul, ol').first();
          nextList.find('li').each((_, li) => {
            const text = $(li).text().trim();
            if (text && text.length > 1) {
              ingredients.push(`• ${text}`);
            }
          });
        }
      });
    }

    return ingredients.join('\n');
  }

  private extractInstructions($: cheerio.CheerioAPI): string {
    const instructions: string[] = [];

    // Try common instruction selectors
    const instructionSelectors = [
      '[itemprop="recipeInstructions"]',
      '.recipe-instructions li',
      '.instructions li',
      '.recipe-steps li',
      '.wprm-recipe-instruction',
      '.directions li',
      '.method li',
    ];

    for (const selector of instructionSelectors) {
      $(selector).each((i, el) => {
        const text = $(el).text().trim();
        if (text && text.length > 5) {
          instructions.push(`${i + 1}. ${text}`);
        }
      });

      if (instructions.length > 0) break;
    }

    // Try paragraph-based instructions
    if (instructions.length === 0) {
      const sectionKeywords = ['postup', 'príprava', 'návod', 'instruction', 'directions', 'method'];

      $('h2, h3, h4, strong, b').each((_, el) => {
        const headerText = $(el).text().toLowerCase();
        if (sectionKeywords.some(kw => headerText.includes(kw))) {
          const nextElements = $(el).nextAll('p, ol li');
          let stepNum = 1;
          nextElements.each((_, item) => {
            const text = $(item).text().trim();
            if (text && text.length > 10) {
              instructions.push(`${stepNum}. ${text}`);
              stepNum++;
            }
          });
        }
      });
    }

    return instructions.join('\n');
  }
}
