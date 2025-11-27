interface ParsedRecipe {
  title: string;
  description?: string;
  ingredients: string;
  instructions: string;
}

// Helper function to clean web page metadata
const cleanWebMetadata = (lines: string[]): string[] => {
  // Patterns to skip (common web page elements)
  const skipPatterns = [
    /^by$/i,
    /^published$/i,
    /^updated$/i,
    /^share$/i,
    /^jump to$/i,
    /^recipe$/i,
    /^video$/i,
    /^\d+\s+(comments?|shares?)$/i,
    /^(cups?|metric)$/i,
    /^cook mode$/i,
    /^prevent screen/i,
    /^author:/i,
    /^prep:/i,
    /^cook:/i,
    /^servings:/i,
    /^\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i, // dates
    /^tap or hover to scale$/i,
    /^print$/i,
  ];

  return lines.filter(line => {
    const trimmed = line.trim();
    if (trimmed.length === 0) return false;

    // Skip lines matching skip patterns
    for (const pattern of skipPatterns) {
      if (pattern.test(trimmed)) return false;
    }

    return true;
  });
};

// Helper to detect if line is a title (not metadata)
const looksLikeTitle = (line: string): boolean => {
  const lower = line.toLowerCase();

  // Skip if it's clearly metadata
  if (lower.startsWith('by ') || lower.startsWith('author:')) return false;
  if (/^\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(line)) return false;

  // Title should be reasonably long but not too long
  if (line.length < 10 || line.length > 150) return false;

  return true;
};

export const parseRecipeFromText = (text: string): ParsedRecipe => {
  let lines = text.split('\n').map(line => line.trim());

  // Clean metadata
  lines = cleanWebMetadata(lines);

  let title = '';
  let description = '';
  const ingredientLines: string[] = [];
  let instructions = '';

  let currentSection: 'title' | 'ingredients' | 'instructions' | 'none' = 'none';
  let instructionLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lowerLine = line.toLowerCase();

    // Skip empty lines
    if (line.length === 0) continue;

    // Detect title - first line that looks like a title
    if (!title && looksLikeTitle(line)) {
      title = line;
      currentSection = 'none';
      continue;
    }

    // Detect ingredients section heading
    if (
      lowerLine === 'ingredients' ||
      lowerLine === 'ingrediencie' ||
      lowerLine === 'suroviny' ||
      lowerLine === 'potrebujeme' ||
      lowerLine.includes('ingredients:') ||
      lowerLine.includes('suroviny:')
    ) {
      currentSection = 'ingredients';
      continue;
    }

    // Detect instructions section heading
    if (
      lowerLine === 'instructions' ||
      lowerLine === 'postup' ||
      lowerLine === 'príprava' ||
      lowerLine === 'návod' ||
      lowerLine === 'directions' ||
      lowerLine === 'method' ||
      lowerLine.includes('instructions:') ||
      lowerLine.includes('postup:')
    ) {
      currentSection = 'instructions';
      continue;
    }

    // Auto-detect ingredients by checkbox symbol ▢
    if (line.startsWith('▢') || line.includes('▢')) {
      currentSection = 'ingredients';
      const cleanedLine = line.replace(/^▢\s*/, '').trim();
      if (cleanedLine) {
        ingredientLines.push('• ' + cleanedLine);
      }
      continue;
    }

    // Parse ingredients
    if (currentSection === 'ingredients') {
      // Check if line looks like an ingredient
      if (
        /^\d+/.test(line) || // starts with number
        /^[-•*▪︎◦]/.test(line) || // starts with bullet
        /\d+\s*(g|kg|ml|l|ks|cup|cups|tbsp|tsp|oz|lb|lyžic|lyžíc|hrnček|hrnčeky|špetk)/i.test(line) // contains measurement
      ) {
        const cleanedLine = line.replace(/^[-•*▪︎◦▢]\s*/, '').trim();
        if (cleanedLine && cleanedLine.length > 2) {
          ingredientLines.push('• ' + cleanedLine);
        }
      } else if (line.length > 3 && !lowerLine.includes('postup') && !lowerLine.includes('príprava') && !lowerLine.includes('instructions')) {
        // If it's not clearly a section header, treat as ingredient
        ingredientLines.push('• ' + line);
      }
    }

    // Parse instructions - handle numbered steps with dash (e.g., "1. Season beef –")
    if (currentSection === 'instructions') {
      // Skip helper text like "Cook Mode", "Prevent screen"
      if (lowerLine.includes('cook mode') || lowerLine.includes('prevent screen')) {
        continue;
      }

      // Clean up instruction line (remove numbered prefix for cleaner look, or keep it)
      const cleanedLine = line.trim();
      if (cleanedLine) {
        instructionLines.push(cleanedLine);
      }
    }

    // If we haven't detected sections yet and line looks like description
    if (currentSection === 'none' && title && !description && line.length > 30 && line.length < 500) {
      // Make sure it's not a metadata line
      if (!lowerLine.includes('author') && !lowerLine.includes('published')) {
        description = line;
      }
    }
  }

  // Join instructions
  instructions = instructionLines.join('\n');

  // If we didn't find explicit sections, try to parse more loosely
  if (ingredientLines.length === 0 && instructions === '') {
    // Look for numbered steps (instructions)
    const numberedSteps = lines.filter(line => /^\d+[\.\)]\s*[A-Z]/.test(line));
    if (numberedSteps.length > 0) {
      instructions = numberedSteps.join('\n');
    }

    // Look for lines that might be ingredients (contains measurements or starts with checkbox)
    const potentialIngredients = lines.filter(line =>
      /\d+\s*(g|kg|ml|l|ks|cup|cups|tbsp|tsp|oz|lb|lyžic|hrnček)/i.test(line) ||
      /^[-•*▪︎◦▢]\s*/.test(line) ||
      line.startsWith('▢')
    );

    potentialIngredients.forEach(line => {
      const cleanedLine = line.replace(/^[-•*▪︎◦▢]\s*/, '').replace(/^\d+\.\s*/, '').trim();
      if (cleanedLine && cleanedLine.length > 2 && !ingredientLines.includes('• ' + cleanedLine)) {
        ingredientLines.push('• ' + cleanedLine);
      }
    });
  }

  // Join ingredients with newlines
  const ingredients = ingredientLines.join('\n');

  return {
    title: title || 'Nový recept',
    description: description || undefined,
    ingredients: ingredients || '',
    instructions: instructions || text // fallback to full text if we couldn't parse
  };
};
