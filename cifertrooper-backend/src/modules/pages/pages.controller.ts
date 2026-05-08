import { Request, Response } from 'express';
import { PagesService } from './pages.service';
import { sendSuccess } from '../../utils/apiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

export const getPage = asyncHandler(async (req: Request, res: Response) => {
  const page = await PagesService.getPage(req.params.slug);
  sendSuccess(res, page);
});

// Named page handlers for specific routes
export const getHome = asyncHandler(async (_req: Request, res: Response) => {
  const page = await PagesService.getPage('home');
  sendSuccess(res, page);
});
export const getAbout = asyncHandler(async (_req: Request, res: Response) => {
  sendSuccess(res, await PagesService.getPage('about-us'));
});
export const getServices = asyncHandler(async (_req: Request, res: Response) => {
  sendSuccess(res, await PagesService.getPage('services'));
});
export const getTeam = asyncHandler(async (_req: Request, res: Response) => {
  sendSuccess(res, await PagesService.getPage('team'));
});
export const getFaq = asyncHandler(async (_req: Request, res: Response) => {
  sendSuccess(res, await PagesService.getPage('faq'));
});
export const getContact = asyncHandler(async (_req: Request, res: Response) => {
  sendSuccess(res, await PagesService.getPage('contact-us'));
});
