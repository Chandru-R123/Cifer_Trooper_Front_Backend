import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess } from '../../utils/apiResponse';
import { Service } from './service.model';
import { AppError } from '../../middleware/errorHandler';

const router = Router();

// GET /api/services — list all published services
router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const services = await Service.find({ isPublished: true }).sort({ order: 1 });
    sendSuccess(res, services);
  })
);

// GET /api/services/:slug — single service
router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const service = await Service.findOne({ slug: req.params.slug, isPublished: true });
    if (!service) throw new AppError('Service not found', 404);
    sendSuccess(res, service);
  })
);

export default router;
