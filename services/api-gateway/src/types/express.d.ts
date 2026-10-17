import express from 'express';

declare global {
  namespace Express {
    interface Response {
      success<T>(status: number, message: string, data: T): this;
      fail<T>(status: number, message: string, errors: T): this;
    }
  }
}
