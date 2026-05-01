import { Router } from 'express';
import passport from 'passport';
import { register } from './register.controller.js';
import { login, googleCallback } from './login.controller.js';
import { updateProfile } from './profile.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

// local auth
router.post('/register', register);
router.post('/login', login);
router.patch('/profile', authenticate, updateProfile);

// google oauth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/api/v1/auth/google/failure' }),
  googleCallback
);
router.get('/google/failure', (_req, res) => {
  res.status(401).json({ success: false, message: 'Google authentication failed' });
});

export default router;
