import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import apiRoutes from './routes';
// import AppResponse from './middlewares/AppResponse';
import ErrorHandler from './utils/ErrorHandler';
import AppResponse from './middlewares/AppResponse';
import helmet from 'helmet';

const app: Application = express();

app.use(helmet());
// Response Handler
app.use(AppResponse);

app.use(cors());
app.use(express.json());

// Grouping Route
app.use('/api', apiRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' });
});

app.use(ErrorHandler);
export default app;
