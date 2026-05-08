import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';

import { env } from './config/env';
import { swaggerSpec } from './config/swagger';
import { errorHandler, notFound } from './middleware/errorHandler';

// Routes
import authRoutes from './modules/auth/auth.routes';
import pagesRoutes from './modules/pages/pages.routes';
import serviceRoutes from './modules/pages/service.routes';
import contactRoutes from './modules/contact/contact.routes';
import newsletterRoutes from './modules/newsletter/newsletter.routes';
import academyRoutes from './modules/academy/academy.routes';
import commerceRoutes from './modules/commerce/commerce.routes';
import toolsRoutes from './modules/tools/tools.routes';

const app = express();

// Security & performance
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGINS, credentials: true }));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Swagger docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', authRoutes); // profile routes share the same router
app.use('/api/pages', pagesRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/courses', academyRoutes);
app.use('/lead.json', academyRoutes);
app.use('/api/commerce', commerceRoutes);
app.use('/api/tools', toolsRoutes);
app.use('/track', toolsRoutes);

// 404 & error handling
app.use(notFound);
app.use(errorHandler);

export default app;
