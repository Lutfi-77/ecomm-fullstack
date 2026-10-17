import { AppError } from './AppError';

export class ConflictError extends AppError {}
export class NotFoundError extends AppError {}
export class UnauthorizedError extends AppError {}
export class ForbiddenError extends AppError {}
export class BadRequestError extends AppError {}
