export interface Idea {
  id: string;
  title: string;
  description: string;
  industry: string;
  projectType: string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: string;
  technologies: string[];
  features: string[];
  objectives: string[];
  challenges: string[];
  generatedAt: string;
}

export interface IdeaRequest {
  industry: string;
  projectType: string;
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