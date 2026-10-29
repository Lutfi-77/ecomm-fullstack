import express, { Request, Response } from 'express';
import sellerRoutes from './presentation/routes/sellerRoute';
import userRoutes from './presentation/routes/userRoute';
import storeRoutes from './presentation/routes/storeRoute';
import addressRoutes from './presentation/routes/addressRoute';
import { errorHandler } from './presentation/middlewares/errorHandler';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    service: 'User Service',
    message: 'User Service is healthy and running 🚀',
    timestamp: new Date().toISOString(),
  });
});

app.use('/seller', sellerRoutes);
app.use('/user', userRoutes);
app.use('/store', storeRoutes);
app.use('/address', addressRoutes);

app.use(errorHandler);

export default app;
