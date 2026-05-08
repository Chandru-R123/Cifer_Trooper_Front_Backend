import { PagesRepository } from './pages.repository';
import { AppError } from '../../middleware/errorHandler';

export const PagesService = {
  async getPage(slug: string) {
    const page = await PagesRepository.findBySlug(slug);
    if (!page) throw new AppError('Page not found', 404);
    return page;
  },
};
