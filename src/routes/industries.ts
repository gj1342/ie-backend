import { Router } from 'express';
import { IndustryController } from '../controllers/IndustryController';
import { validateId, validateSearchQuery } from '../middleware/validation';

const router = Router();
const industryController = new IndustryController();

router.get('/', industryController.getAllIndustries.bind(industryController));

router.get('/search', validateSearchQuery, industryController.searchIndustries.bind(industryController));

router.get('/:id', validateId, industryController.getIndustryById.bind(industryController));

export default router;