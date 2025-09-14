import { Request, Response } from 'express';
import { ProjectTypeService, CreateProjectTypeData, UpdateProjectTypeData } from '../services/ProjectTypeService';
import { ResponseHelper } from '../utils/ResponseHelper';
import { AppError, ValidationError, NotFoundError } from '../utils/ErrorHandler';

export class ProjectTypeController {
  constructor(private projectTypeService: ProjectTypeService) {}

  async getAllProjectTypes(req: Request, res: Response): Promise<void> {
    try {
      const projectTypes = await this.projectTypeService.getAllProjectTypes();
      ResponseHelper.success(res, projectTypes, 'Project types retrieved successfully');
    } catch (error) {
      console.error('Error fetching project types:', error);
      ResponseHelper.error(res, 'Failed to fetch project types');
    }
  }

  async getProjectTypeById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        ResponseHelper.badRequest(res, 'Project type ID is required');
        return;
      }
      
      const projectType = await this.projectTypeService.getProjectTypeById(id);
      
      if (!projectType) {
        ResponseHelper.notFound(res, 'Project type not found');
        return;
      }
      
      ResponseHelper.success(res, projectType, 'Project type retrieved successfully');
    } catch (error) {
      console.error('Error fetching project type by ID:', error);
      ResponseHelper.error(res, 'Failed to fetch project type');
    }
  }

  async searchProjectTypes(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query as { q: string };
      const projectTypes = await this.projectTypeService.searchProjectTypes(q);
      ResponseHelper.success(res, projectTypes, 'Project types search completed');
    } catch (error) {
      console.error('Error searching project types:', error);
      ResponseHelper.error(res, 'Failed to search project types');
    }
  }

  async createProjectType(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateProjectTypeData = req.body;
      
      if (!data.name) {
        ResponseHelper.badRequest(res, 'Name is required');
        return;
      }

      const projectType = await this.projectTypeService.createProjectType(data);
      ResponseHelper.success(res, projectType, 'Project type created successfully', 201);
    } catch (error) {
      console.error('Error creating project type:', error);
      
      if (error instanceof ValidationError) {
        ResponseHelper.badRequest(res, error.message);
        return;
      }
      
      ResponseHelper.error(res, 'Failed to create project type');
    }
  }

  async updateProjectType(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        ResponseHelper.badRequest(res, 'Project type ID is required');
        return;
      }
      
      const data: UpdateProjectTypeData = req.body;
      const projectType = await this.projectTypeService.updateProjectType(id, data);
      ResponseHelper.success(res, projectType, 'Project type updated successfully');
    } catch (error) {
      console.error('Error updating project type:', error);
      
      if (error instanceof NotFoundError) {
        ResponseHelper.notFound(res, error.message);
        return;
      }
      
      if (error instanceof ValidationError) {
        ResponseHelper.badRequest(res, error.message);
        return;
      }
      
      ResponseHelper.error(res, 'Failed to update project type');
    }
  }

  async deleteProjectType(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        ResponseHelper.badRequest(res, 'Project type ID is required');
        return;
      }
      
      await this.projectTypeService.deleteProjectType(id);
      ResponseHelper.success(res, null, 'Project type deleted successfully');
    } catch (error) {
      console.error('Error deleting project type:', error);
      
      if (error instanceof NotFoundError) {
        ResponseHelper.notFound(res, error.message);
        return;
      }
      
      ResponseHelper.error(res, 'Failed to delete project type');
    }
  }

  async softDeleteProjectType(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        ResponseHelper.badRequest(res, 'Project type ID is required');
        return;
      }
      
      const projectType = await this.projectTypeService.softDeleteProjectType(id);
      ResponseHelper.success(res, projectType, 'Project type deactivated successfully');
    } catch (error) {
      console.error('Error soft deleting project type:', error);
      
      if (error instanceof NotFoundError) {
        ResponseHelper.notFound(res, error.message);
        return;
      }
      
      ResponseHelper.error(res, 'Failed to deactivate project type');
    }
  }
}