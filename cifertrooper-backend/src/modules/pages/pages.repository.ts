import { Page } from './pages.model';

export const PagesRepository = {
  findBySlug: (slug: string) => Page.findOne({ slug, isPublished: true }),
  findAll: () => Page.find({ isPublished: true }),
  upsert: (slug: string, data: object) =>
    Page.findOneAndUpdate({ slug }, data, { upsert: true, new: true }),
};
