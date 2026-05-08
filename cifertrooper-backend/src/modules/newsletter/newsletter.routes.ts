import { Router } from 'express';
import { body } from 'express-validator';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess } from '../../utils/apiResponse';
import { validate } from '../../middleware/validate';
import { Newsletter } from './newsletter.model';

const router = Router();

/**
 * @swagger
 * /api/newsletter:
 *   post:
 *     tags: [Newsletter]
 *     summary: Subscribe to newsletter
 */
router.post(
  '/',
  validate([body('email').isEmail().normalizeEmail()]),
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      sendSuccess(res, existing, 'Already subscribed');
      return;
    }
    const sub = await Newsletter.create({ email });
    sendSuccess(res, sub, 'Subscribed successfully', 201);
  })
);

export default router;
