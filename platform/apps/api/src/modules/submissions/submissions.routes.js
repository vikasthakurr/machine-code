import { Router } from 'express';
import { submit, getById, getMySubmissions } from './submissions.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.post('/',   submit);
router.get('/me',  getMySubmissions);
router.get('/:id', getById);

export default router;
