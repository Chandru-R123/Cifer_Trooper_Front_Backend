import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  slug: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  instructor: string;
  curriculum: { title: string; lessons: string[] }[];
  isPublished: boolean;
  tags: string[];
}

const CourseSchema = new Schema<ICourse>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    price: { type: Number, default: 0 },
    duration: { type: String, default: '' },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    instructor: { type: String, default: '' },
    curriculum: [{ title: String, lessons: [String] }],
    isPublished: { type: Boolean, default: true },
    tags: [String],
  },
  { timestamps: true }
);

export const Course = mongoose.model<ICourse>('Course', CourseSchema);

// Lead form
export interface ILead extends Document {
  name: string;
  email: string;
  phone?: string;
  courseInterest?: string;
  message?: string;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    courseInterest: String,
    message: String,
  },
  { timestamps: true }
);

export const Lead = mongoose.model<ILead>('Lead', LeadSchema);
