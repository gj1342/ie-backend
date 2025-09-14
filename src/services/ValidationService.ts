import { Industry } from '../models/Industry';
import { ProjectType } from '../models/ProjectType';

export class ValidationService {
  static async validateIndustry(industryId: string): Promise<boolean> {
    const industry = await Industry.findOne({ id: industryId, isActive: true });
    return !!industry;
  }

  static async validateProjectType(projectTypeId: string): Promise<boolean> {
    const projectType = await ProjectType.findOne({ id: projectTypeId, isActive: true });
    return !!projectType;
  }

  static async getValidIndustries(): Promise<string[]> {
    const industries = await Industry.find({ isActive: true }).select('id');
    return industries.map(industry => industry.id);
  }

  static async getValidProjectTypes(): Promise<string[]> {
    const projectTypes = await ProjectType.find({ isActive: true }).select('id');
    return projectTypes.map(projectType => projectType.id);
  }
}
