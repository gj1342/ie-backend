import { Router } from 'express';
import { ProjectTypeController } from '../controllers/ProjectTypeController';
import { ProjectTypeService } from '../services/ProjectTypeService';
import { validateId, validateSearchQuery, validateCreateProjectType, validateUpdateProjectType } from '../middleware/validation';

const router = Router();
const projectTypeService = new ProjectTypeService();
const projectTypeController = new ProjectTypeController(projectTypeService);

router.get('/', projectTypeController.getAllProjectTypes.bind(projectTypeController));
router.get('/search', validateSearchQuery, projectTypeController.searchProjectTypes.bind(projectTypeController));
router.get('/:id', validateId, projectTypeController.getProjectTypeById.bind(projectTypeController));

router.post('/', validateCreateProjectType, projectTypeController.createProjectType.bind(projectTypeController));

router.put('/:id', validateId, validateUpdateProjectType, projectTypeController.updateProjectType.bind(projectTypeController));

router.delete('/:id', validateId, projectTypeController.deleteProjectType.bind(projectTypeController));
router.patch('/:id/deactivate', validateId, projectTypeController.softDeleteProjectType.bind(projectTypeController));

export default router;