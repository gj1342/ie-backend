import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { env } from '../config/env';
import { AppError } from '../utils/ErrorHandler';

interface MistralMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface MistralResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  usage: {
    total_tokens: number;
  };
}

export class MistralService {
  private client: AxiosInstance;
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000;

  constructor() {
    if (!env.MISTRAL_API_KEY) {
      throw new AppError('Mistral API key is not configured', 500);
    }

    this.client = axios.create({
      baseURL: env.MISTRAL_API_URL,
      headers: {
        'Authorization': `Bearer ${env.MISTRAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 429) {
          throw new AppError('Rate limit exceeded. Please try again later.', 429);
        }
        if (error.response?.status === 401) {
          throw new AppError('Invalid API key. Please check your Mistral API configuration.', 401);
        }
        if (error.code === 'ECONNABORTED') {
          throw new AppError('Request timeout. Please try again.', 408);
        }
        throw error;
      }
    );
  }

  async generateIdea(industry: string, projectType: string, userInterests: string[], complexity: string = 'intermediate'): Promise<string> {
    const randomnessSeed = Math.random().toString(36).slice(2, 10);
    const prompt = this.buildPrompt(industry, projectType, userInterests, complexity, randomnessSeed);
    
    const messages: MistralMessage[] = [
      {
        role: 'system',
        content: 'You are an expert project advisor who generates innovative, feasible capstone project ideas. Always respond with valid JSON format containing project details.'
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const response: AxiosResponse<MistralResponse> = await this.client.post('/chat/completions', {
          model: 'mistral-small-latest',
          messages,
          temperature: 0.95,
          top_p: 0.95,
          max_tokens: 2000,
        });

        if (!response.data.choices || response.data.choices.length === 0) {
          throw new AppError('No response generated from Mistral AI', 500);
        }

        const choice = response.data.choices[0];
        if (!choice || !choice.message || !choice.message.content) {
          throw new AppError('Invalid response format from Mistral AI', 500);
        }

        return choice.message.content;
      } catch (error) {
        if (attempt === this.maxRetries) {
          if (error instanceof AppError) {
            throw error;
          }
          throw new AppError(`Failed to generate idea after ${this.maxRetries} attempts: ${error instanceof Error ? error.message : 'Unknown error'}`, 500);
        }
        
        await this.delay(this.retryDelay * attempt);
      }
    }

    throw new AppError('Unexpected error in idea generation', 500);
  }

  private buildPrompt(industry: string, projectType: string, userInterests: string[], complexity: string, randomnessSeed: string): string {
    return `Generate a detailed capstone project idea with the following specifications:

    Industry: ${industry}
    Project Type: ${projectType}
    User Interests: ${userInterests.join(', ')}
    Complexity Level: ${complexity}

    Please respond with a JSON object containing exactly these fields:
    {
    "title": "Project title (max 100 characters)",
    "description": "Detailed project description (200-500 words)",
    "technologies": ["array", "of", "suggested", "technologies"],
    "features": ["array", "of", "key", "features"],
    "objectives": ["array", "of", "learning", "objectives"],
    "challenges": ["array", "of", "potential", "challenges"],
    "estimatedDuration": "Duration estimate (e.g., '3-6 months')"
    }

    Make the idea innovative, practical, and aligned with the specified industry and project type. Ensure it's appropriate for the complexity level and incorporates the user's interests.

    Randomization seed: ${randomnessSeed}
    Notes: With the same inputs, you should provide a different creative angle each time.`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
