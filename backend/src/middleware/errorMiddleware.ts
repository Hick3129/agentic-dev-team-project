import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error(err);
  if (res.headersSent) {
    return _next(err);
  }
  res.status(500).json({
    success: false,
    error: 'INTERNAL_ERROR',
    message: '伺服器內部錯誤',
  });
}