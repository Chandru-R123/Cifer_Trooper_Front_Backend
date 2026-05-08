import { AcademyRepository } from './academy.repository';
import { AppError } from '../../middleware/errorHandler';

export const AcademyService = {
  async getCourses() {
    return AcademyRepository.findAllCourses();
  },

  async getCourse(slug: string) {
    const course = await AcademyRepository.findCourseBySlug(slug);
    if (!course) throw new AppError('Course not found', 404);
    return course;
  },

  async submitLead(data: object) {
    return AcademyRepository.createLead(data);
  },
};
