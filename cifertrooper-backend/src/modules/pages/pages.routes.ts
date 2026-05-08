import { Router } from 'express';
import {
  getHome, getAbout, getServices, getTeam, getFaq, getContact, getPage,
} from './pages.controller';

const router = Router();

router.get('/home', getHome);
router.get('/about-us', getAbout);
router.get('/services', getServices);
router.get('/team', getTeam);
router.get('/faq', getFaq);
router.get('/contact-us', getContact);

export default router;
