import { Request, Response } from 'express';
import { IndustryService } from '../services/IndustryService';
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants';
import { API_VERSION } from '../constants';

export class IndustryController {
  private industryService: IndustryService;

  constructor() {
    this.industryService = new IndustryService();
  }

  async getAllIndustries(req: Request, res: Response): Promise<void> {
    try {
      const industries = await this.industryService.getAllIndustries();
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.DATA_RETRIEVED,
        data: industries,
        meta: {
          apiVersion: API_VERSION,
          timestamp: new Date().toISOString(),
          count: industries.length
        }
      });
    } catch (error) {
      console.error('Error fetching industries:', error);
      
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : 'Failed to fetch industries'
      });
    }
  }

  async getIndustryById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          error: ERROR_MESSAGES.BAD_REQUEST,
          message: 'Industry ID is required'
        });
        return;
      }
      
      const industry = await this.industryService.getIndustryById(id);
      
      if (!industry) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          error: ERROR_MESSAGES.NOT_FOUND,
          message: 'Industry not found'
        });
        return;
      }
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.DATA_RETRIEVED,
        data: industry,
        meta: {
          apiVersion: API_VERSION,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error fetching industry by ID:', error);
      
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : 'Failed to fetch industry'
      });
    }
  }

  async searchIndustries(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== 'string') {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          error: ERROR_MESSAGES.BAD_REQUEST,
          message: 'Search query is required'
        });
        return;
      }
      
      const industries = await this.industryService.searchIndustries(q);
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.DATA_RETRIEVED,
        data: industries,
        meta: {
          apiVersion: API_VERSION,
          timestamp: new Date().toISOString(),
          count: industries.length,
          query: q
        }
      });
    } catch (error) {
      console.error('Error searching industries:', error);
      
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : 'Failed to search industries'
      });
    }
  }
}