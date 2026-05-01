import { Router } from 'express';
import { getAll, markRead } from './notifications.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/',           getAll);
router.patch('/:id/read', markRead);

export default router;
