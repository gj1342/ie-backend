import { Router } from 'express';
import { IndustryController } from '../controllers/IndustryController';
import { IndustryService } from '../services/IndustryService';
import { validateId, validateSearchQuery, validateCreateIndustry, validateUpdateIndustry } from '../middleware/validation';

const router = Router();
const industryService = new IndustryService();
const industryController = new IndustryController(industryService);

router.get('/', industryController.getAllIndustries.bind(industryController));
router.get('/search', validateSearchQuery, industryController.searchIndustries.bind(industryController));
router.get('/:id', validateId, industryController.getIndustryById.bind(industryController));

router.post('/', validateCreateIndustry, industryController.createIndustry.bind(industryController));

router.put('/:id', validateId, validateUpdateIndustry, industryController.updateIndustry.bind(industryController));

router.delete('/:id', validateId, industryController.deleteIndustry.bind(industryController));
router.patch('/:id/deactivate', validateId, industryController.softDeleteIndustry.bind(industryController));

export default router;