import { Request, Response, NextFunction } from 'express';
import { Jwt } from '../../infrastructure/security/Jwt';
import { UnauthorizedError } from '../../application/errors/DomainErrors';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;

  if (!header) {
    throw new UnauthorizedError('Unauthorized');
  }

  const token = header.split(' ')[1];

  if (!token || token == 'undefined') {
    throw new UnauthorizedError('Token Is Missing');
  }

  const jwt = new Jwt();
  const data = jwt.verify(token);

  req.user = data.id;
  (req as any).userRole = data.role;
  next();
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = (req as any).userRole;
    if (!role || !allowedRoles.includes(role)) {
      throw new UnauthorizedError('Unauthorized: Insufficient permissions');
    }
    next();
  };
};
