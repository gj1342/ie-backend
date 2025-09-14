import { Request, Response } from 'express';
import { IndustryService, CreateIndustryData, UpdateIndustryData } from '../services/IndustryService';
import { ResponseHelper } from '../utils/ResponseHelper';
import { AppError, ValidationError, NotFoundError } from '../utils/ErrorHandler';

export class IndustryController {
  constructor(private industryService: IndustryService) {}

  async getAllIndustries(req: Request, res: Response): Promise<void> {
    try {
      const industries = await this.industryService.getAllIndustries();
      ResponseHelper.success(res, industries);
    } catch (error) {
      console.error('Error fetching industries:', error);
      ResponseHelper.error(res, 'Failed to fetch industries');
    }
  }

  async getIndustryById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        ResponseHelper.badRequest(res, 'Industry ID is required');
        return;
      }
      
      const industry = await this.industryService.getIndustryById(id);
      
      if (!industry) {
        ResponseHelper.notFound(res, 'Industry');
        return;
      }
      
      ResponseHelper.success(res, industry);
    } catch (error) {
      console.error('Error fetching industry by ID:', error);
      ResponseHelper.error(res, 'Failed to fetch industry');
    }
  }

  async searchIndustries(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== 'string') {
        ResponseHelper.badRequest(res, 'Search query is required');
        return;
      }
      
      const industries = await this.industryService.searchIndustries(q);
      ResponseHelper.success(res, industries);
    } catch (error) {
      console.error('Error searching industries:', error);
      ResponseHelper.error(res, 'Failed to search industries');
    }
  }

  async createIndustry(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateIndustryData = req.body;
      
      if (!data.name) {
        ResponseHelper.badRequest(res, 'Name is required');
        return;
      }

      const industry = await this.industryService.createIndustry(data);
      ResponseHelper.success(res, industry, 'Industry created successfully', 201);
    } catch (error) {
      console.error('Error creating industry:', error);
      
      if (error instanceof ValidationError) {
        ResponseHelper.badRequest(res, error.message);
        return;
      }
      
      ResponseHelper.error(res, 'Failed to create industry');
    }
  }

  async updateIndustry(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: UpdateIndustryData = req.body;
      
      if (!id) {
        ResponseHelper.badRequest(res, 'Industry ID is required');
        return;
      }

      const industry = await this.industryService.updateIndustry(id, data);
      ResponseHelper.success(res, industry, 'Industry updated successfully');
    } catch (error) {
      console.error('Error updating industry:', error);
      
      if (error instanceof NotFoundError) {
        ResponseHelper.notFound(res, 'Industry');
        return;
      }
      
      ResponseHelper.error(res, 'Failed to update industry');
    }
  }

  async deleteIndustry(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id) {
        ResponseHelper.badRequest(res, 'Industry ID is required');
        return;
      }

      await this.industryService.deleteIndustry(id);
      ResponseHelper.success(res, null, 'Industry deleted successfully');
    } catch (error) {
      console.error('Error deleting industry:', error);
      
      if (error instanceof NotFoundError) {
        ResponseHelper.notFound(res, 'Industry');
        return;
      }
      
      ResponseHelper.error(res, 'Failed to delete industry');
    }
  }

  async softDeleteIndustry(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id) {
        ResponseHelper.badRequest(res, 'Industry ID is required');
        return;
      }

      const industry = await this.industryService.softDeleteIndustry(id);
      ResponseHelper.success(res, industry, 'Industry deactivated successfully');
    } catch (error) {
      console.error('Error soft deleting industry:', error);
      
      if (error instanceof NotFoundError) {
        ResponseHelper.notFound(res, 'Industry');
        return;
      }
      
      ResponseHelper.error(res, 'Failed to deactivate industry');
    }
  }
}