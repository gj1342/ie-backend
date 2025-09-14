import { ProjectType, IProjectType } from '../models/ProjectType';
import { DatabaseError, ValidationError, NotFoundError } from '../utils/ErrorHandler';

export interface CreateProjectTypeData {
  name: string;
}

export interface UpdateProjectTypeData {
  name?: string;
  isActive?: boolean;
}

export class ProjectTypeService {
  async getAllProjectTypes(): Promise<IProjectType[]> {
    try {
      const projectTypes = await ProjectType.find({ isActive: true })
        .select('name')
        .sort({ name: 1 });
      
      return projectTypes;
    } catch (error) {
      console.error('Error fetching project types:', error);
      throw new DatabaseError('Failed to fetch project types', error as Error);
    }
  }

  async getProjectTypeById(id: string): Promise<IProjectType | null> {
    try {
      const projectType = await ProjectType.findOne({ _id: id, isActive: true })
        .select('name');
      
      return projectType;
    } catch (error) {
      console.error('Error fetching project type by ID:', error);
      throw new DatabaseError('Failed to fetch project type', error as Error);
    }
  }

  async searchProjectTypes(query: string): Promise<IProjectType[]> {
    try {
      const projectTypes = await ProjectType.find({
        isActive: true,
        name: { $regex: query, $options: 'i' }
      })
        .select('name')
        .sort({ name: 1 });
      
      return projectTypes;
    } catch (error) {
      console.error('Error searching project types:', error);
      throw new DatabaseError('Failed to search project types', error as Error);
    }
  }

  async createProjectType(data: CreateProjectTypeData): Promise<IProjectType> {
    try {
      const projectType = new ProjectType({
        name: data.name.trim(),
        isActive: true
      });

      const savedProjectType = await projectType.save();
      return savedProjectType;
    } catch (error) {
      console.error('Error creating project type:', error);
      throw new DatabaseError('Failed to create project type', error as Error);
    }
  }

  async updateProjectType(id: string, data: UpdateProjectTypeData): Promise<IProjectType> {
    try {
      const projectType = await ProjectType.findOne({ _id: id });
      if (!projectType) {
        throw new NotFoundError('Project type');
      }

      if (data.name !== undefined) {
        projectType.name = data.name.trim();
      }
      if (data.isActive !== undefined) {
        projectType.isActive = data.isActive;
      }

      const updatedProjectType = await projectType.save();
      return updatedProjectType;
    } catch (error) {
      console.error('Error updating project type:', error);
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError('Failed to update project type', error as Error);
    }
  }

  async deleteProjectType(id: string): Promise<void> {
    try {
      const projectType = await ProjectType.findOne({ _id: id });
      if (!projectType) {
        throw new NotFoundError('Project type');
      }

      await ProjectType.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error deleting project type:', error);
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError('Failed to delete project type', error as Error);
    }
  }

  async softDeleteProjectType(id: string): Promise<IProjectType> {
    try {
      const projectType = await ProjectType.findOne({ _id: id });
      if (!projectType) {
        throw new NotFoundError('Project type');
      }

      projectType.isActive = false;
      const updatedProjectType = await projectType.save();
      return updatedProjectType;
    } catch (error) {
      console.error('Error soft deleting project type:', error);
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError('Failed to soft delete project type', error as Error);
    }
  }
}