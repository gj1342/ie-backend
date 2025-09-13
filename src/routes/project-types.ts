import { Router } from 'express';
import { ProjectTypeController } from '../controllers/ProjectTypeController';
import { validateId, validateSearchQuery } from '../middleware/validation';

const router = Router();
const projectTypeController = new ProjectTypeController();

router.get('/', projectTypeController.getAllProjectTypes.bind(projectTypeController));

router.get('/search', validateSearchQuery, projectTypeController.searchProjectTypes.bind(projectTypeController));

router.get('/:id', validateId, projectTypeController.getProjectTypeById.bind(projectTypeController));

export default router;