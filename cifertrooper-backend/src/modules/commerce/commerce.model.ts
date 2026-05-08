import mongoose, { Document, Schema } from 'mongoose';

// Product
export interface IProduct extends Document {
  slug: string;
  title: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  stock: number;
  isPublished: boolean;
  tags: string[];
}

const ProductSchema = new Schema<IProduct>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    comparePrice: Number,
    images: [String],
    category: { type: String, default: 'general' },
    stock: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
    tags: [String],
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', ProductSchema);

// Cart
export interface ICartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  updatedAt: Date;
}

const CartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        price: Number,
      },
    ],
  },
  { timestamps: true }
);

export const Cart = mongoose.model<ICart>('Cart', CartSchema);

// Order
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: Record<string, string>;
  paymentInfo?: Record<string, unknown>;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        price: Number,
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    shippingAddress: { type: Schema.Types.Mixed, default: {} },
    paymentInfo: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
