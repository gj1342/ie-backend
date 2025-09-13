export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    apiVersion: string;
    timestamp: string;
  };
}

export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
  code?: string;
  details?: any;
}

export interface HealthResponse {
  success: true;
  message: string;
  version: string;
  timestamp: string;
  uptime: number;
  environment: string;
}

export interface IdeaRequest {
  industry: string;
  projectType: string;
  userInterests: string[];
  complexity?: 'beginner' | 'intermediate' | 'advanced';
}

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

export interface IdeasResponse {
  success: true;
  message: string;
  data: {
    ideas: Idea[];
    generatedAt: string;
  };
  meta: {
    apiVersion: string;
    timestamp: string;
  };
}
