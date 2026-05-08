import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess } from '../../utils/apiResponse';
import { authenticate, authorize } from '../../middleware/auth';
import { IpLog, GrabberLink } from './tools.model';

const router = Router();

/**
 * @swagger
 * /api/tools/ip-lookup:
 *   get:
 *     tags: [Tools]
 *     summary: Get requester IP info
 */
router.get(
  '/ip-lookup',
  asyncHandler(async (req: Request, res: Response) => {
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown';
    sendSuccess(res, {
      ip,
      userAgent: req.headers['user-agent'],
      timestamp: new Date(),
    });
  })
);

/**
 * @swagger
 * /api/tools/ip-grabber/logs:
 *   get:
 *     tags: [Tools]
 *     summary: Get IP grabber logs (admin only)
 */
router.get(
  '/ip-grabber/logs',
  authenticate,
  authorize('admin'),
  asyncHandler(async (_req, res) => {
    const logs = await IpLog.find().sort({ timestamp: -1 }).limit(500);
    sendSuccess(res, logs);
  })
);

/**
 * @swagger
 * /api/tools/ip-grabber/create-link:
 *   post:
 *     tags: [Tools]
 *     summary: Create a tracking link
 */
router.post(
  '/ip-grabber/create-link',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req, res) => {
    const { label, redirectUrl } = req.body;
    const linkId = uuidv4();
    const link = await GrabberLink.create({ linkId, label, redirectUrl });
    sendSuccess(res, { ...link.toObject(), trackUrl: `/track/${linkId}` }, 'Link created', 201);
  })
);

// Public tracking endpoint — logs IP and redirects
router.get(
  '/track/:linkId',
  asyncHandler(async (req: Request, res: Response) => {
    const link = await GrabberLink.findOne({ linkId: req.params.linkId });
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown';

    await IpLog.create({
      linkId: req.params.linkId,
      ip,
      userAgent: req.headers['user-agent'] || '',
      referer: req.headers.referer || '',
    });

    if (link) {
      res.redirect(link.redirectUrl);
    } else {
      res.status(404).json({ success: false, message: 'Link not found' });
    }
  })
);

export default router;
