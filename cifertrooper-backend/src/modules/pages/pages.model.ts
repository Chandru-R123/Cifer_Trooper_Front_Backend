import mongoose, { Document, Schema } from 'mongoose';

export interface IPage extends Document {
  slug: string;
  title: string;
  content: Record<string, unknown>;
  isPublished: boolean;
}

const PageSchema = new Schema<IPage>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true },
    title: { type: String, required: true },
    content: { type: Schema.Types.Mixed, default: {} },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Page = mongoose.model<IPage>('Page', PageSchema);
