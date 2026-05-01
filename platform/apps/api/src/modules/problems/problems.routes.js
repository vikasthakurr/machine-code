import { Router } from 'express';
import { getAll, getBySlug, create } from './problems.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/',      getAll);
router.get('/:slug', getBySlug);
router.post('/', authenticate, create);

export default router;
