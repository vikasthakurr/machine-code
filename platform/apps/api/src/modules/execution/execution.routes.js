import { Router } from 'express';
import { getResult } from './execution.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/:submissionId', authenticate, getResult);

export default router;
