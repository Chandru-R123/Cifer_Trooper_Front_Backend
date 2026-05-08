import { CommerceRepository } from './commerce.repository';
import { AppError } from '../../middleware/errorHandler';

export const CommerceService = {
  async getProducts() {
    return CommerceRepository.findAllProducts();
  },

  async getProduct(slug: string) {
    const product = await CommerceRepository.findProductBySlug(slug);
    if (!product) throw new AppError('Product not found', 404);
    return product;
  },

  async getCart(userId: string) {
    return CommerceRepository.findCartByUser(userId) || { items: [] };
  },

  async syncCart(userId: string, items: object[]) {
    return CommerceRepository.upsertCart(userId, items);
  },

  async checkout(userId: string, shippingAddress: object, paymentInfo?: object) {
    const cart = await CommerceRepository.findCartByUser(userId);
    if (!cart || cart.items.length === 0) throw new AppError('Cart is empty', 400);

    const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await CommerceRepository.createOrder({
      user: userId,
      items: cart.items,
      total,
      shippingAddress,
      paymentInfo,
    });

    // Clear cart after checkout
    await CommerceRepository.upsertCart(userId, []);
    return order;
  },

  async getOrders(userId: string) {
    return CommerceRepository.findOrdersByUser(userId);
  },

  async getOrder(orderId: string, userId: string) {
    const order = await CommerceRepository.findOrderById(orderId, userId);
    if (!order) throw new AppError('Order not found', 404);
    return order;
  },
};
