// src/presentation/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  BadRequestError,
} from '../../application/errors/DomainErrors';
import jwt from 'jsonwebtoken';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  if (err instanceof ConflictError) {
    return res.status(409).json({ success: false, message: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({ success: false, message: err.message });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(401).json({ success: false, message: err.message });
  }

  if (err instanceof ForbiddenError) {
    return res.status(403).json({ success: false, message: err.message });
  }

  if (err instanceof BadRequestError) {
    return res.status(400).json({ success: false, message: err.message });
  }

  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).json({
      success: false,
      message: 'Token has expired',
    });
  }

  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token signature',
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message,
  });
};
