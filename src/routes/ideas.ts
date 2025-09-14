import { Router } from 'express';
import { IdeaController } from '../controllers/IdeaController';
import { IdeaService } from '../services/IdeaService';
import { validateIdeaRequest } from '../middleware/validation';

const router = Router();
const ideaService = new IdeaService();
const ideaController = new IdeaController(ideaService);

router.post('/generate', validateIdeaRequest, ideaController.generateIdea.bind(ideaController));

export default router;