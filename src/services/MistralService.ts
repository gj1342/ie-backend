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
  private recentArchetypes: string[] = [];
  private recentModalities: string[] = [];

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

  async generateIdea(industry: string, projectType: string, userInterests: string[] | undefined, complexity: string = 'intermediate'): Promise<string> {
    const randomnessSeed = Math.random().toString(36).slice(2, 10);
    const safeInterests = Array.isArray(userInterests) ? userInterests : [];
    const creativeDirectives = this.buildCreativeDirectives(industry, projectType, safeInterests, complexity, randomnessSeed);
    const prompt = this.buildPrompt(industry, projectType, safeInterests, complexity, randomnessSeed, creativeDirectives);
    
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
        const temp = Math.min(1.1, Math.max(0.9, 0.95 + (Math.random() - 0.5) * 0.2));
        const topP = Math.min(0.99, Math.max(0.9, 0.96 + (Math.random() - 0.5) * 0.06));
        const response: AxiosResponse<MistralResponse> = await this.client.post('/chat/completions', {
          model: 'mistral-small-latest',
          messages,
          temperature: temp,
          top_p: topP,
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

  private buildPrompt(industry: string, projectType: string, userInterests: string[] | undefined, complexity: string, randomnessSeed: string, creativeDirectives: string): string {
    const interestsText = userInterests && userInterests.length > 0 ? userInterests.join(', ') : 'N/A';
    return `Generate a detailed, brand-new capstone project idea with the following specifications:

    Industry: ${industry}
    Project Type: ${projectType}
    User Interests: ${interestsText}
    Complexity Level: ${complexity}

    Please respond with a JSON object containing exactly these fields (and only these fields):
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
    Creative directives (HARD constraints – use these to produce a fundamentally different idea, not a revision of a previous one):
    ${creativeDirectives}
    Notes: With the same inputs, you must produce a different core problem, unique title, and distinct features/objectives every time. Do not paraphrase a prior idea.`;
  }

  private buildCreativeDirectives(industry: string, projectType: string, userInterests: string[], complexity: string, seed: string): string {
    const rand = () => Math.random();
    const pick = <T,>(arr: T[]): T => arr[Math.floor(rand() * arr.length)] as T;
    const pickMany = <T,>(arr: T[], n: number) => {
      const copy = [...arr];
      const out: T[] = [];
      for (let i = 0; i < n && copy.length > 0; i++) {
        const idx = Math.floor(rand() * copy.length);
        const removed = copy.splice(idx, 1)[0];
        if (removed !== undefined) out.push(removed as T);
      }
      return out;
    };

    const angles = [
      'Prioritize low-cost, resource-constrained implementation suitable for student teams',
      'Integrate a lightweight mobile-first UX targeting emerging markets',
      'Focus on privacy-by-design and robust security practices for all data flows',
      'Leverage edge computing where feasible to minimize cloud dependency',
      'Emphasize explainability of models and transparent evaluation metrics',
      'Embed sustainability goals (reduced energy, circular practices, minimal waste)',
      'Design for offline-first with resilient sync patterns',
      'Target accessibility and inclusive design (WCAG-aware features)',
      'Use open-source stacks and clearly state licenses',
      'Plan modular architecture enabling future feature expansion',
    ];

    const contexts = [
      `Local context emphasis (e.g., ${userInterests[0] || 'your region'})`,
      'Campus-scale pilot with real stakeholders and feedback loops',
      'SME-focused deployment with realistic constraints',
      'Community-driven co-creation and participatory design',
      'Data minimization and synthetic data where possible',
      'Interoperability through open standards and APIs',
    ];

    const techSpices = [
      'Consider contrasting two alternative approaches and justify the chosen one',
      'Include an ablation idea to compare features/tech choices',
      'Propose a simple baseline and a stretch/advanced variant',
      'Define success metrics and evaluation plan aligned to the complexity level',
    ];

    const archetypes = [
      'Predictive analytics with supervised learning on domain data',
      'Anomaly detection and monitoring pipeline',
      'Recommendation/decision-support system for target users',
      'Computer vision pipeline (detection/segmentation/recognition)',
      'NLP assistant/agent specialized for the industry',
      'IoT sensing + edge processing with cloud aggregation',
      'Blockchain-backed auditability/traceability ledger',
      'Simulation/digital-twin for planning and what-if analysis',
      'Optimization engine (routing/scheduling/resource allocation)',
      'Serious game or gamified learning/training platform',
    ];

    const modalities = [
      'time-series sensor data',
      'geospatial data and maps',
      'images/video streams',
      'textual records and forms',
      'audio/voice inputs',
      'multimodal fusion of text+image',
    ];

    const available = archetypes.filter(a => !this.recentArchetypes.includes(a));
    const chosenArchetype: string = (available.length > 0 ? pick(available) : pick(archetypes));
    this.recentArchetypes.push(chosenArchetype);
    if (this.recentArchetypes.length > 3) this.recentArchetypes.shift();

    const chosenModality: string = pick(modalities);
    this.recentModalities.push(chosenModality);
    if (this.recentModalities.length > 3) this.recentModalities.shift();

    const selected = [
      `Archetype: ${chosenArchetype}`,
      `Primary data modality: ${chosenModality}`,
      ...pickMany(angles, 2),
      pick(contexts),
      pick(techSpices),
    ];

    const isMonitoring = /monitor|detection|tracking/i.test(chosenArchetype || '');
    if (!isMonitoring) {
      selected.unshift('Hard constraint: Do NOT produce a monitoring/tracking/alerting system; propose a different core concept per the archetype.');
    }

    if (this.recentArchetypes.length > 0) {
      selected.unshift(`Do not reuse these recent archetypes: ${[...this.recentArchetypes].join(', ')}`);
    }
    if (this.recentModalities.length > 0) {
      selected.unshift(`Do not reuse these recent data modalities: ${[...this.recentModalities].join(', ')}`);
    }

    return selected.map((s, i) => `${i + 1}. ${s}`).join('\n    ');
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
