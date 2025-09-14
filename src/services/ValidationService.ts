import { Industry } from '../models/Industry';
import { ProjectType } from '../models/ProjectType';

export class ValidationService {
  static async validateIndustry(industryName: string): Promise<boolean> {
    const industry = await Industry.findOne({ 
      name: { $regex: new RegExp(`^${industryName}$`, 'i') }, 
      isActive: true 
    });
    return !!industry;
  }

  static async validateProjectType(projectTypeName: string): Promise<boolean> {
    const projectType = await ProjectType.findOne({ 
      name: { $regex: new RegExp(`^${projectTypeName}$`, 'i') }, 
      isActive: true 
    });
    return !!projectType;
  }

  static async getValidIndustries(): Promise<string[]> {
    const industries = await Industry.find({ isActive: true }).select('name');
    return industries.map(industry => industry.name);
  }

  static async getValidProjectTypes(): Promise<string[]> {
    const projectTypes = await ProjectType.find({ isActive: true }).select('name');
    return projectTypes.map(projectType => projectType.name);
  }
}
