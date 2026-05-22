import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  slug: string;
  title: string;
  description: string;
  image: string;
  isPublished: boolean;
  order: number;
  // Rich detail fields
  subtitle?: string;
  heroImageUrl?: string;
  about?: {
    title: string;
    description: string[];
    ctaText: string;
    imageUrl: string;
  };
  sections?: {
    subtitle?: string;
    title: string;
    items: { title: string; image?: string; description: string; list?: string[] }[];
  }[];
  benefits?: string[];
  faqs?: { question: string; answer: string }[];
}

const ServiceSchema = new Schema<IService>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    subtitle: String,
    heroImageUrl: String,
    about: { type: Schema.Types.Mixed },
    sections: { type: Schema.Types.Mixed },
    benefits: [String],
    faqs: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const Service = mongoose.model<IService>('Service', ServiceSchema);
