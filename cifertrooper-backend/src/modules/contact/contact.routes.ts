import { Router } from 'express';
import { body } from 'express-validator';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess } from '../../utils/apiResponse';
import { validate } from '../../middleware/validate';
import { Contact } from './contact.model';

const router = Router();

/**
 * @swagger
 * /api/contact:
 *   post:
 *     tags: [Contact]
 *     summary: Submit contact form
 */
router.post(
  '/',
  validate([
    body('name').notEmpty(),
    body('email').isEmail(),
    body('subject').notEmpty(),
    body('message').notEmpty(),
  ]),
  asyncHandler(async (req, res) => {
    const contact = await Contact.create(req.body);
    sendSuccess(res, contact, 'Message sent successfully', 201);
  })
);

export default router;
