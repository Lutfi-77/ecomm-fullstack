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

  if (data.role != 'SELLER') {
    throw new UnauthorizedError('Unauthorized');
  }
  req.user = data.id;
  next();
};
