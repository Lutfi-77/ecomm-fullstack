import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validated = schema.parse(req.body);
    next();
    if (validated instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validated.issues.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }
  };
};
