import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess } from '../../utils/apiResponse';
import { authenticate } from '../../middleware/auth';
import { AuthRequest } from '../../middleware/auth';
import { CommerceService } from './commerce.service';

const router = Router();

router.get('/products', asyncHandler(async (_req, res) => {
  sendSuccess(res, await CommerceService.getProducts());
}));

router.get('/products/:slug', asyncHandler(async (req, res) => {
  sendSuccess(res, await CommerceService.getProduct(req.params.slug));
}));

router.get('/cart', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  sendSuccess(res, await CommerceService.getCart(req.user!.userId));
}));

router.post('/cart/sync', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const cart = await CommerceService.syncCart(req.user!.userId, req.body.items || []);
  sendSuccess(res, cart, 'Cart synced');
}));

router.post('/checkout', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const order = await CommerceService.checkout(
    req.user!.userId,
    req.body.shippingAddress,
    req.body.paymentInfo
  );
  sendSuccess(res, order, 'Order placed', 201);
}));

router.get('/orders', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  sendSuccess(res, await CommerceService.getOrders(req.user!.userId));
}));

router.get('/orders/:orderId', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  sendSuccess(res, await CommerceService.getOrder(req.params.orderId, req.user!.userId));
}));

export default router;
