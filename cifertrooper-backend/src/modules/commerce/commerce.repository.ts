import { Product, Cart, Order } from './commerce.model';
import mongoose from 'mongoose';

export const CommerceRepository = {
  // Products
  findAllProducts: (filter = {}) => Product.find({ isPublished: true, ...filter }),
  findProductBySlug: (slug: string) => Product.findOne({ slug, isPublished: true }),

  // Cart
  findCartByUser: (userId: string) =>
    Cart.findOne({ user: new mongoose.Types.ObjectId(userId) }).populate('items.product'),
  upsertCart: (userId: string, items: object[]) =>
    Cart.findOneAndUpdate(
      { user: new mongoose.Types.ObjectId(userId) },
      { items },
      { upsert: true, new: true }
    ).populate('items.product'),

  // Orders
  createOrder: (data: object) => Order.create(data),
  findOrdersByUser: (userId: string) =>
    Order.find({ user: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 }),
  findOrderById: (orderId: string, userId: string) =>
    Order.findOne({ _id: orderId, user: new mongoose.Types.ObjectId(userId) }),
};
