import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.routes.js';
import projectsRoutes from './routes/projects.routes.js';
import metaRoutes from './routes/meta.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Security Middleware
app.use(helmet());

// CORS: restricted to configured frontend origins (comma-separated FRONTEND_URL)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://easwar-dev.vercel.app',
  ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map((o) => o.trim()) : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, false);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

// Body Parsing
app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: true, limit: '64kb' }));

// Rate Limiting on Contact API (protect against spam)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 submissions per window
  message: {
    success: false,
    message: 'Too many contact submissions from this IP. Please wait 15 minutes before submitting again or email directly.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    service: 'easwar-portfolio-api',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Mount Routes
app.use('/api/contact', contactLimiter, contactRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/meta', metaRoutes);

// Root fallback
app.get('/', (_req: Request, res: Response) => {
  res.json({
    service: 'Easwar S — Portfolio Production API',
    documentation: 'Health check at /health, projects at /api/projects, meta at /api/meta',
    author: 'Easwar S',
  });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'The requested API endpoint does not exist.',
  });
});

// Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[SERVER GLOBAL ERROR]', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred.',
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[API SERVER] Easwar Portfolio API running at http://localhost:${PORT}`);
    console.log(`[API SERVER] Health check available at http://localhost:${PORT}/health`);
  });
}

export default app;
