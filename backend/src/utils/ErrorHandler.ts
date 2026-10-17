import { type Request, type Response, type NextFunction } from 'express';
import { AppError } from './AppError';
import { ZodError } from 'zod';

// const app

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

const ErrorHandler = function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.fail(err.status, err.message, err.errors);
  } else if (err instanceof ZodError) {
    return res.fail(400, 'Validation Error', err.issues);
  }
  return res.fail(500, 'Something Error', err.message);
};

export default ErrorHandler;
