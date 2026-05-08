import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  slug: string;
  title: string;
  description: string;
  image: string;
  content: Record<string, unknown>;
  isPublished: boolean;
  order: number;
}

const ServiceSchema = new Schema<IService>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    content: { type: Schema.Types.Mixed, default: {} },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Service = mongoose.model<IService>('Service', ServiceSchema);
