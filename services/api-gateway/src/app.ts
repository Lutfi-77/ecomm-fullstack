import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { config } from './config';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redisClient } from './config/redis';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Konfigurasi Rate Limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Periode 15 menit
  max: 100, // Maksimal 100 request per IP dalam 15 menit
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'error',
    message:
      'Too many requests from this IP, please try again after 15 minutes',
  },
  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.sendCommand(args),
  }),
});

app.use(generalLimiter);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'API Gateway is healthy and running 🚀',
    timestamp: new Date().toISOString(),
  });
});

app.use(
  ['/api/v1/auth', '/api/v1/users', '/api/v1/stores'],
  createProxyMiddleware({
    target: config.services.user,
    changeOrigin: true,
  }),
);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found on API Gateway`,
  });
});

export default app;
