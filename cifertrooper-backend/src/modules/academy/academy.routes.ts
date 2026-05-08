import { Router } from 'express';
import { body } from 'express-validator';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess } from '../../utils/apiResponse';
import { validate } from '../../middleware/validate';
import { AcademyService } from './academy.service';

const router = Router();

/**
 * @swagger
 * /api/courses:
 *   get:
 *     tags: [Academy]
 *     summary: List all courses
 */
router.get(
  '/',
  asyncHandler(async (_req, res) => {
    sendSuccess(res, await AcademyService.getCourses());
  })
);

/**
 * @swagger
 * /api/courses/{slug}:
 *   get:
 *     tags: [Academy]
 *     summary: Get course by slug
 */
router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    sendSuccess(res, await AcademyService.getCourse(req.params.slug));
  })
);

/**
 * @swagger
 * /lead.json:
 *   post:
 *     tags: [Academy]
 *     summary: Submit lead form
 */
router.post(
  '/lead',
  validate([body('name').notEmpty(), body('email').isEmail()]),
  asyncHandler(async (req, res) => {
    const lead = await AcademyService.submitLead(req.body);
    sendSuccess(res, lead, 'Lead submitted', 201);
  })
);

export default router;
