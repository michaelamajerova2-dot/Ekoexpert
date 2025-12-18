import { Request, Response } from 'express';
import { ScrapeService } from '../services/scrapeService';

const scrapeService = new ScrapeService();

export class ScrapeController {
  async scrapeRecipe(req: Request, res: Response): Promise<void> {
    try {
      const { url } = req.body;

      if (!url) {
        res.status(400).json({ error: 'URL je povinný parameter' });
        return;
      }

      // Basic URL validation
      try {
        new URL(url);
      } catch {
        res.status(400).json({ error: 'Neplatný formát URL' });
        return;
      }

      const recipe = await scrapeService.scrapeRecipe(url);

      if (!recipe.title && !recipe.ingredients && !recipe.instructions) {
        res.status(404).json({ error: 'Nepodarilo sa nájsť recept na tejto stránke' });
        return;
      }

      res.json(recipe);
    } catch (error) {
      console.error('Scrape error:', error);
      res.status(500).json({ error: 'Nepodarilo sa načítať recept z URL' });
    }
  }
}
