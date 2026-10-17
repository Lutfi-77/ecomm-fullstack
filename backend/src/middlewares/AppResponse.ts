import express, { Request, Response, NextFunction } from 'express';

const AppResponse = (req: Request, res: Response, next: NextFunction) => {
  res.success = <T>(status: number, message: string, data: T) => {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  };

  res.fail = <T>(status: number, message: string, errors: T) => {
    return res.status(status).json({
      success: false,
      message,
      errors,
    });
  };

  next();
};

export default AppResponse;
