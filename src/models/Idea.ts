import { IndustryEnum } from './Industry';
import { ProjectTypeEnum } from './ProjectType';

export interface Idea {
  id: string;
  title: string;
  description: string;
  industry: IndustryEnum;
  projectType: ProjectTypeEnum;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: string;
  technologies: string[];
  features: string[];
  objectives: string[];
  challenges: string[];
  generatedAt: string;
}

export interface IdeaRequest {
  industry: IndustryEnum;
  projectType: ProjectTypeEnum;
  userInterests: string[];
  complexity?: 'beginner' | 'intermediate' | 'advanced';
}

export interface IdeaResponse {
  success: boolean;
  version: string;
  data: {
    idea: Idea;
    generatedAt: string;
  };
  meta: {
    apiVersion: string;
    timestamp: string;
  };
}