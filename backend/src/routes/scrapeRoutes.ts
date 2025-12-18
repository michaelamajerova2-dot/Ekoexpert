import { Router } from 'express';
import { ScrapeController } from '../controllers/scrapeController';

const router = Router();
const scrapeController = new ScrapeController();

router.post('/scrape-recipe', (req, res) => scrapeController.scrapeRecipe(req, res));

export default router;
