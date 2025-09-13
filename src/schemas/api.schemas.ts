export const ApiSchemas = {
  Error: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: false,
      },
      error: {
        type: 'string',
        example: 'Validation Error',
      },
      message: {
        type: 'string',
        example: 'Invalid request parameters',
      },
      code: {
        type: 'string',
        example: 'VALIDATION_ERROR',
      },
      details: {
        type: 'object',
        description: 'Additional error details',
      },
    },
    required: ['success', 'error'],
  },
  
  Success: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true,
      },
      message: {
        type: 'string',
        example: 'Request processed successfully',
      },
      data: {
        type: 'object',
        description: 'Response data',
      },
      meta: {
        type: 'object',
        properties: {
          apiVersion: {
            type: 'string',
            example: '1.0.0',
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            example: '2023-12-25T10:30:45.000Z',
          },
        },
      },
    },
    required: ['success'],
  },

  HealthResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true,
      },
      message: {
        type: 'string',
        example: 'InnovativeSphere API is running',
      },
      version: {
        type: 'string',
        example: '1.0.0',
      },
      timestamp: {
        type: 'string',
        format: 'date-time',
        example: '2023-12-25T10:30:45.000Z',
      },
      uptime: {
        type: 'number',
        example: 123.456,
        description: 'Server uptime in seconds',
      },
      environment: {
        type: 'string',
        example: 'development',
        enum: ['development', 'staging', 'production'],
      },
    },
    required: ['success', 'message', 'version', 'timestamp', 'uptime', 'environment'],
  },

  IdeaRequest: {
    type: 'object',
    properties: {
      industry: {
        type: 'string',
        example: 'healthcare',
        description: 'Target industry for the project',
      },
      projectType: {
        type: 'string',
        example: 'web-application',
        description: 'Type of project to generate',
      },
      userInterests: {
        type: 'array',
        items: {
          type: 'string',
        },
        example: ['machine learning', 'user experience'],
        description: 'User interests and preferences',
      },
      complexity: {
        type: 'string',
        enum: ['beginner', 'intermediate', 'advanced'],
        example: 'intermediate',
        description: 'Project complexity level',
      },
    },
    required: ['industry', 'projectType', 'userInterests'],
  },

  Idea: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        example: 'idea_123456789',
        description: 'Unique identifier for the idea',
      },
      title: {
        type: 'string',
        example: 'AI-Powered Patient Monitoring System',
        description: 'Project title',
      },
      description: {
        type: 'string',
        example: 'A comprehensive patient monitoring system...',
        description: 'Detailed project description',
      },
      industry: {
        type: 'string',
        example: 'healthcare',
        description: 'Target industry',
      },
      projectType: {
        type: 'string',
        example: 'web-application',
        description: 'Type of project',
      },
      complexity: {
        type: 'string',
        enum: ['beginner', 'intermediate', 'advanced'],
        example: 'intermediate',
        description: 'Project complexity level',
      },
      estimatedDuration: {
        type: 'string',
        example: '3-4 months',
        description: 'Estimated development time',
      },
      technologies: {
        type: 'array',
        items: {
          type: 'string',
        },
        example: ['React', 'Node.js', 'MongoDB', 'TensorFlow'],
        description: 'Recommended technologies',
      },
      features: {
        type: 'array',
        items: {
          type: 'string',
        },
        example: ['Real-time monitoring', 'Alert system', 'Data visualization'],
        description: 'Key project features',
      },
      objectives: {
        type: 'array',
        items: {
          type: 'string',
        },
        example: ['Improve patient care', 'Reduce monitoring costs'],
        description: 'Project objectives',
      },
      challenges: {
        type: 'array',
        items: {
          type: 'string',
        },
        example: ['Data privacy compliance', 'Real-time processing'],
        description: 'Potential challenges',
      },
      generatedAt: {
        type: 'string',
        format: 'date-time',
        example: '2023-12-25T10:30:45.000Z',
        description: 'Idea generation timestamp',
      },
    },
    required: ['id', 'title', 'description', 'industry', 'projectType', 'complexity', 'estimatedDuration', 'technologies', 'features', 'objectives', 'challenges', 'generatedAt'],
  },

  IdeaResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true,
      },
      message: {
        type: 'string',
        example: 'Idea generated successfully',
      },
      data: {
        type: 'object',
        properties: {
          idea: {
            $ref: '#/components/schemas/Idea',
          },
          generatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2023-12-25T10:30:45.000Z',
          },
        },
        required: ['idea', 'generatedAt'],
      },
      meta: {
        type: 'object',
        properties: {
          apiVersion: {
            type: 'string',
            example: '1.0.0',
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            example: '2023-12-25T10:30:45.000Z',
          },
        },
        required: ['apiVersion', 'timestamp'],
      },
    },
    required: ['success', 'message', 'data', 'meta'],
  },
};