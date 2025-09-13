import { Request, Response } from 'express';
import { API_VERSION, HTTP_STATUS, SUCCESS_MESSAGES } from '../constants';
import { env } from '../config/env';
import { HealthResponse } from '../types/api';

export const getHealth = (req: Request, res: Response): void => {
  const response: HealthResponse = {
    success: true,
    message: SUCCESS_MESSAGES.API_RUNNING,
    version: API_VERSION,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: env.NODE_ENV,
  };

  res.status(HTTP_STATUS.OK).json(response);
};