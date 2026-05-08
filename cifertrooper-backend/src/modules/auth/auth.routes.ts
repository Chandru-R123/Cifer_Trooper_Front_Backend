import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, logout, getProfile, updateProfile } from './auth.controller';
import { authenticate } from '../../middleware/auth';
import { validate } from '../../middleware/validate';

const router = Router();

router.post(
  '/register',
  validate([
    body('name').notEmpty().trim(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
  ]),
  register
);

router.post(
  '/login',
  validate([body('email').isEmail(), body('password').notEmpty()]),
  login
);

router.post('/logout', authenticate, logout);

// User profile routes
router.get('/user/profile', authenticate, getProfile);
router.put('/user/profile', authenticate, updateProfile);

export default router;
