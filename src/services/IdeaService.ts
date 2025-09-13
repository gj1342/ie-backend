import { Idea, IdeaRequest } from '../models/Idea';
import { API_VERSION } from '../constants';

export class IdeaService {
  async generateIdea(request: IdeaRequest): Promise<Idea> {
    throw new Error('Idea generation not implemented yet. Mistral API integration required.');
  }

  private generateIdeaId(): string {
    return `idea_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private validateRequest(request: IdeaRequest): void {
    if (!request.industry) {
      throw new Error('Industry is required');
    }
    if (!request.projectType) {
      throw new Error('Project type is required');
    }
    if (!request.userInterests || request.userInterests.length === 0) {
      throw new Error('User interests are required');
    }
  }
}