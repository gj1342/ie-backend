import { Router } from 'express';
import { getHealth } from './health';
import ideasRouter from './ideas';
import industriesRouter from './industries';
import projectTypesRouter from './project-types';

const router = Router();

router.get('/health', getHealth);

router.use('/ideas', ideasRouter);
router.use('/industries', industriesRouter);
router.use('/project-types', projectTypesRouter);

export default router;