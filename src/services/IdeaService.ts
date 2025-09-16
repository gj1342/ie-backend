import { Idea, IdeaRequest } from '../models/Idea';
import { API_VERSION } from '../constants';
import { MistralService } from './MistralService';
import { AppError, ValidationError } from '../utils/ErrorHandler';

export class IdeaService {
  private mistralService: MistralService;

  constructor() {
    this.mistralService = new MistralService();
  }

  async generateIdea(request: IdeaRequest): Promise<Idea> {
    this.validateRequest(request);

    try {
      const aiResponse = await this.mistralService.generateIdea(
        request.industry,
        request.projectType,
        request.userInterests,
        request.complexity || 'intermediate'
      );

      const parsedIdea = this.parseAIResponse(aiResponse);
      
      return {
        id: this.generateIdeaId(),
        title: parsedIdea.title!,
        description: parsedIdea.description!,
        industry: request.industry,
        projectType: request.projectType,
        complexity: request.complexity || 'intermediate',
        estimatedDuration: parsedIdea.estimatedDuration!,
        technologies: parsedIdea.technologies!,
        features: parsedIdea.features!,
        objectives: parsedIdea.objectives!,
        challenges: parsedIdea.challenges!,
        generatedAt: new Date().toISOString(),
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(`Failed to generate idea: ${error instanceof Error ? error.message : 'Unknown error'}`, 500);
    }
  }

  private generateIdeaId(): string {
    return `idea_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private validateRequest(request: IdeaRequest): void {
    if (!request.industry) {
      throw new ValidationError('Industry is required');
    }
    if (!request.projectType) {
      throw new ValidationError('Project type is required');
    }
    if (request.userInterests && request.userInterests.length > 10) {
      throw new ValidationError('Maximum 10 interests allowed');
    }
  }

  private parseAIResponse(response: string): Partial<Idea> {
    try {
      const cleanedResponse = response.trim();
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        throw new Error('No JSON found in AI response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      if (!parsed.title || !parsed.description) {
        throw new Error('Invalid AI response format');
      }

      return {
        title: parsed.title.substring(0, 100),
        description: parsed.description,
        estimatedDuration: parsed.estimatedDuration || '',
        technologies: Array.isArray(parsed.technologies) ? parsed.technologies.slice(0, 10) : [],
        features: Array.isArray(parsed.features) ? parsed.features.slice(0, 15) : [],
        objectives: Array.isArray(parsed.objectives) ? parsed.objectives.slice(0, 10) : [],
        challenges: Array.isArray(parsed.challenges) ? parsed.challenges.slice(0, 8) : [],
      };
    } catch (error) {
      throw new AppError(`Failed to parse AI response: ${error instanceof Error ? error.message : 'Unknown error'}`, 500);
    }
  }
}