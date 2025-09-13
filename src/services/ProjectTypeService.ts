import { ProjectType, IProjectType } from '../models/ProjectType';
import { HTTP_STATUS, ERROR_MESSAGES } from '../constants';

export class ProjectTypeService {
  async getAllProjectTypes(): Promise<IProjectType[]> {
    try {
      const projectTypes = await ProjectType.find({ isActive: true })
        .select('id name description')
        .sort({ name: 1 });
      
      return projectTypes;
    } catch (error) {
      console.error('Error fetching project types:', error);
      throw new Error('Failed to fetch project types');
    }
  }

  async getProjectTypeById(id: string): Promise<IProjectType | null> {
    try {
      const projectType = await ProjectType.findOne({ id, isActive: true })
        .select('id name description');
      
      return projectType;
    } catch (error) {
      console.error('Error fetching project type by ID:', error);
      throw new Error('Failed to fetch project type');
    }
  }

  async searchProjectTypes(query: string): Promise<IProjectType[]> {
    try {
      const projectTypes = await ProjectType.find({
        isActive: true,
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      })
        .select('id name description')
        .sort({ name: 1 });
      
      return projectTypes;
    } catch (error) {
      console.error('Error searching project types:', error);
      throw new Error('Failed to search project types');
    }
  }
}