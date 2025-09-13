import { Request, Response } from 'express';
import { ProjectTypeService } from '../services/ProjectTypeService';
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants';
import { API_VERSION } from '../constants';

export class ProjectTypeController {
  private projectTypeService: ProjectTypeService;

  constructor() {
    this.projectTypeService = new ProjectTypeService();
  }

  async getAllProjectTypes(req: Request, res: Response): Promise<void> {
    try {
      const projectTypes = await this.projectTypeService.getAllProjectTypes();
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.DATA_RETRIEVED,
        data: projectTypes,
        meta: {
          apiVersion: API_VERSION,
          timestamp: new Date().toISOString(),
          count: projectTypes.length
        }
      });
    } catch (error) {
      console.error('Error fetching project types:', error);
      
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : 'Failed to fetch project types'
      });
    }
  }

  async getProjectTypeById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          error: ERROR_MESSAGES.BAD_REQUEST,
          message: 'Project type ID is required'
        });
        return;
      }
      
      const projectType = await this.projectTypeService.getProjectTypeById(id);
      
      if (!projectType) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          error: ERROR_MESSAGES.NOT_FOUND,
          message: 'Project type not found'
        });
        return;
      }
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.DATA_RETRIEVED,
        data: projectType,
        meta: {
          apiVersion: API_VERSION,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error fetching project type by ID:', error);
      
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : 'Failed to fetch project type'
      });
    }
  }

  async searchProjectTypes(req: Request, res: Response): Promise<void> {
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
      
      const projectTypes = await this.projectTypeService.searchProjectTypes(q);
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.DATA_RETRIEVED,
        data: projectTypes,
        meta: {
          apiVersion: API_VERSION,
          timestamp: new Date().toISOString(),
          count: projectTypes.length,
          query: q
        }
      });
    } catch (error) {
      console.error('Error searching project types:', error);
      
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : 'Failed to search project types'
      });
    }
  }
}