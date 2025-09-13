import { Request, Response } from 'express';
import { IdeaService } from '../services/IdeaService';
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants';
import { API_VERSION } from '../constants';
import { IdeaRequest, IdeaResponse } from '../models/Idea';

export class IdeaController {
  private ideaService: IdeaService;

  constructor() {
    this.ideaService = new IdeaService();
  }

  async generateIdea(req: Request, res: Response): Promise<void> {
    try {
      const request: IdeaRequest = req.body;
      
      const idea = await this.ideaService.generateIdea(request);
      
      const response: IdeaResponse = {
        success: true,
        version: API_VERSION,
        data: {
          idea,
          generatedAt: new Date().toISOString()
        },
        meta: {
          apiVersion: API_VERSION,
          timestamp: new Date().toISOString()
        }
      };

      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      console.error('Error generating idea:', error);
      
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : 'Failed to generate idea'
      });
    }
  }
}