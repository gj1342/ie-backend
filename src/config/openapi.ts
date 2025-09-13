import { API_VERSION } from '../constants';
import { ApiSchemas } from '../schemas/api.schemas';

export const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'InnovativeSphere API',
    version: API_VERSION,
    description: 'AI-powered capstone project idea generator API. Generate personalized project ideas based on industry, project type, and user interests.',
    contact: {
      name: 'InnovativeSphere Team',
      email: 'support@innovativesphere.com',
      url: 'https://innovativesphere.com',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
    termsOfService: 'https://innovativesphere.com/terms',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Development server',
    },
    {
      url: 'https://api.innovativesphere.com/api/v1',
      description: 'Production server',
    },
  ],
  tags: [
    {
      name: 'Health',
      description: 'API health and status endpoints',
    },
    {
      name: 'Ideas',
      description: 'Project idea generation and management',
    },
    {
      name: 'Industries',
      description: 'Available industry categories',
    },
    {
      name: 'Project Types',
      description: 'Available project types',
    },
  ],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check endpoint',
        description: 'Returns the current status and health information of the API',
        operationId: 'getHealth',
        security: [],
        responses: {
          '200': {
            description: 'API is running successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/HealthResponse',
                },
                example: {
                  success: true,
                  message: 'InnovativeSphere API is running',
                  version: '1.0.0',
                  timestamp: '2023-12-25T10:30:45.000Z',
                  uptime: 123.456,
                  environment: 'development',
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/ideas/generate': {
      post: {
        tags: ['Ideas'],
        summary: 'Generate a project idea',
        description: 'Generate a personalized project idea based on user preferences',
        operationId: 'generateIdea',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/IdeaRequest',
              },
              example: {
                industry: 'healthcare',
                projectType: 'web-application',
                userInterests: ['machine learning', 'user experience'],
                complexity: 'intermediate',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Idea generated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/IdeaResponse',
                },
                example: {
                  success: true,
                  message: 'Idea generated successfully',
                  data: {
                    idea: {
                      id: 'idea_123456789',
                      title: 'AI-Powered Patient Portal',
                      description: 'A comprehensive patient monitoring system that uses AI to predict health issues and provides personalized care recommendations...',
                      industry: 'healthcare',
                      projectType: 'web-application',
                      complexity: 'intermediate',
                      estimatedDuration: '3-4 months',
                      technologies: ['React', 'Node.js', 'TensorFlow', 'MongoDB'],
                      features: ['Real-time monitoring', 'Alert system', 'Data visualization'],
                      objectives: ['Improve patient care', 'Reduce monitoring costs'],
                      challenges: ['Data privacy compliance', 'Real-time processing'],
                      generatedAt: '2023-12-25T10:30:45.000Z'
                    },
                    generatedAt: '2023-12-25T10:30:45.000Z'
                  },
                  meta: {
                    apiVersion: '1.0.0',
                    timestamp: '2023-12-25T10:30:45.000Z'
                  }
                },
              },
            },
          },
          '400': {
            description: 'Bad request - invalid input',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/industries': {
      get: {
        tags: ['Industries'],
        summary: 'Get all industries',
        description: 'Retrieve list of available industry categories',
        operationId: 'getAllIndustries',
        security: [],
        responses: {
          '200': {
            description: 'Industries retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Industries retrieved successfully' },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/IndustryInfo',
                      },
                    },
                  },
                },
                example: {
                  success: true,
                  message: 'Industries retrieved successfully',
                  data: [
                    {
                      id: 'healthcare',
                      name: 'Healthcare',
                      description: 'Medical, pharmaceutical, and health-related projects',
                    },
                    {
                      id: 'education',
                      name: 'Education',
                      description: 'Educational technology and learning platforms',
                    },
                  ],
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/industries/search': {
      get: {
        tags: ['Industries'],
        summary: 'Search industries',
        description: 'Search industries by name or description',
        operationId: 'searchIndustries',
        security: [],
        parameters: [
          {
            name: 'q',
            in: 'query',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'Search query',
            example: 'health',
          },
        ],
        responses: {
          '200': {
            description: 'Search results retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Search results retrieved successfully' },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/IndustryInfo',
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad request - invalid search query',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/industries/{id}': {
      get: {
        tags: ['Industries'],
        summary: 'Get industry by ID',
        description: 'Retrieve a specific industry by its ID',
        operationId: 'getIndustryById',
        security: [],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'Industry identifier',
            example: 'healthcare',
          },
        ],
        responses: {
          '200': {
            description: 'Industry retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Industry retrieved successfully' },
                    data: {
                      $ref: '#/components/schemas/IndustryInfo',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad request - invalid ID',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '404': {
            description: 'Industry not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/project-types': {
      get: {
        tags: ['Project Types'],
        summary: 'Get all project types',
        description: 'Retrieve list of available project types',
        operationId: 'getAllProjectTypes',
        security: [],
        responses: {
          '200': {
            description: 'Project types retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Project types retrieved successfully' },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/ProjectTypeInfo',
                      },
                    },
                  },
                },
                example: {
                  success: true,
                  message: 'Project types retrieved successfully',
                  data: [
                    {
                      id: 'web-application',
                      name: 'Web Application',
                      description: 'Browser-based applications and web platforms',
                    },
                    {
                      id: 'mobile-application',
                      name: 'Mobile Application',
                      description: 'iOS and Android mobile applications',
                    },
                  ],
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/project-types/search': {
      get: {
        tags: ['Project Types'],
        summary: 'Search project types',
        description: 'Search project types by name or description',
        operationId: 'searchProjectTypes',
        security: [],
        parameters: [
          {
            name: 'q',
            in: 'query',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'Search query',
            example: 'web',
          },
        ],
        responses: {
          '200': {
            description: 'Search results retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Search results retrieved successfully' },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/ProjectTypeInfo',
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad request - invalid search query',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/project-types/{id}': {
      get: {
        tags: ['Project Types'],
        summary: 'Get project type by ID',
        description: 'Retrieve a specific project type by its ID',
        operationId: 'getProjectTypeById',
        security: [],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'Project type identifier',
            example: 'web-application',
          },
        ],
        responses: {
          '200': {
            description: 'Project type retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Project type retrieved successfully' },
                    data: {
                      $ref: '#/components/schemas/ProjectTypeInfo',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad request - invalid ID',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '404': {
            description: 'Project type not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
        description: 'API key for authentication. Contact support@innovativesphere.com to obtain an API key.',
      },
    },
    schemas: {
      ...ApiSchemas,
      IndustryInfo: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'healthcare',
            description: 'Industry identifier',
          },
          name: {
            type: 'string',
            example: 'Healthcare',
            description: 'Industry name',
          },
          description: {
            type: 'string',
            example: 'Medical, pharmaceutical, and health-related projects',
            description: 'Industry description',
          },
        },
        required: ['id', 'name', 'description'],
      },
      ProjectTypeInfo: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'web-application',
            description: 'Project type identifier',
          },
          name: {
            type: 'string',
            example: 'Web Application',
            description: 'Project type name',
          },
          description: {
            type: 'string',
            example: 'Browser-based applications and web platforms',
            description: 'Project type description',
          },
        },
        required: ['id', 'name', 'description'],
      },
    },
  },
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  externalDocs: {
    description: 'Find out more about InnovativeSphere',
    url: 'https://innovativesphere.com/docs',
  },
};