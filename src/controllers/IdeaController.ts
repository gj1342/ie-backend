import { Request, Response } from 'express';
import { IdeaService } from '../services/IdeaService';
import { ResponseHelper } from '../utils/ResponseHelper';
import { AppError, ValidationError } from '../utils/ErrorHandler';
import { IdeaRequest } from '../models/Idea';

export class IdeaController {
  constructor(private ideaService: IdeaService) {}

  async generateIdea(req: Request, res: Response): Promise<void> {
    try {
      const request: IdeaRequest = req.body;
      
      if (!request.industry) {
        ResponseHelper.badRequest(res, 'Industry is required');
        return;
      }
      
      if (!request.projectType) {
        ResponseHelper.badRequest(res, 'Project type is required');
        return;
      }
      
      // userInterests is optional

      const idea = await this.ideaService.generateIdea(request);
      ResponseHelper.success(res, { idea, generatedAt: new Date().toISOString() }, 'Idea generated successfully');
    } catch (error) {
      if (error instanceof ValidationError) {
        ResponseHelper.badRequest(res, error.message);
        return;
      }
      if (error instanceof AppError) {
        ResponseHelper.error(res, error.message, error.statusCode);
        return;
      }
      ResponseHelper.error(res, 'Failed to generate idea');
    }
  }
}