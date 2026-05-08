import { Course, Lead } from './academy.model';

export const AcademyRepository = {
  findAllCourses: () => Course.find({ isPublished: true }).sort({ createdAt: -1 }),
  findCourseBySlug: (slug: string) => Course.findOne({ slug, isPublished: true }),
  createLead: (data: object) => Lead.create(data),
};
