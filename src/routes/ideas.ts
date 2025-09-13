import { Router } from 'express';
import { IdeaController } from '../controllers/IdeaController';
import { validateIdeaRequest } from '../middleware/validation';

const router = Router();
const ideaController = new IdeaController();

router.post('/generate', validateIdeaRequest, ideaController.generateIdea.bind(ideaController));

export default router;