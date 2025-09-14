import { Response } from 'express';
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants';
import { API_VERSION } from '../constants';

export class ResponseHelper {
  static success(res: Response, data: any, message: string = SUCCESS_MESSAGES.DATA_RETRIEVED, statusCode: number = HTTP_STATUS.OK): void {
    res.status(statusCode).json({
      success: true,
      message,
      data,
      meta: {
        apiVersion: API_VERSION,
        timestamp: new Date().toISOString(),
        count: Array.isArray(data) ? data.length : undefined
      }
    });
  }

  static error(res: Response, message: string, statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR, error?: string): void {
    res.status(statusCode).json({
      success: false,
      error: error || ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      message
    });
  }

  static notFound(res: Response, resource: string): void {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      error: ERROR_MESSAGES.NOT_FOUND,
      message: `${resource} not found`
    });
  }

  static badRequest(res: Response, message: string): void {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: ERROR_MESSAGES.BAD_REQUEST,
      message
    });
  }
}

