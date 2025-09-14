import { API_VERSION } from '../constants';
import { ApiSchemas } from '../schemas/api.schemas';
import { env } from './env';

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
      url: `${env.API_BASE_URL}/api/v1`,
      description: env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
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
                      _id: '507f1f77bcf86cd799439011',
                      name: 'Healthcare',
                    },
                    {
                      _id: '507f1f77bcf86cd799439012',
                      name: 'Education',
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
      post: {
        tags: ['Industries'],
        summary: 'Create new industry',
        description: 'Create a new industry',
        operationId: 'createIndustry',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateIndustryRequest',
              },
              example: {
                name: 'Agriculture',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Industry created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Success',
                },
                example: {
                  success: true,
                  message: 'Industry created successfully',
                  data: {
                    _id: '507f1f77bcf86cd799439015',
                    name: 'Agriculture',
                    isActive: true,
                    createdAt: '2024-01-15T10:30:00.000Z',
                    updatedAt: '2024-01-15T10:30:00.000Z',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad request - validation error',
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
      put: {
        tags: ['Industries'],
        summary: 'Update industry',
        description: 'Update an existing industry',
        operationId: 'updateIndustry',
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
            example: '507f1f77bcf86cd799439011',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateIndustryRequest',
              },
              example: {
                name: 'Updated Healthcare',
                isActive: true,
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Industry updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Success',
                },
                example: {
                  success: true,
                  message: 'Industry updated successfully',
                  data: {
                    _id: '507f1f77bcf86cd799439011',
                    name: 'Updated Healthcare',
                    isActive: true,
                    createdAt: '2024-01-15T10:30:00.000Z',
                    updatedAt: '2024-01-15T11:00:00.000Z',
                  },
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
          '400': {
            description: 'Bad request - validation error',
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
      delete: {
        tags: ['Industries'],
        summary: 'Delete industry',
        description: 'Permanently delete an industry by ID',
        operationId: 'deleteIndustry',
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
            description: 'Industry deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Industry deleted successfully' },
                    data: { type: 'null', example: null },
                  },
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
    '/industries/{id}/deactivate': {
      patch: {
        tags: ['Industries'],
        summary: 'Deactivate industry',
        description: 'Soft delete an industry by setting isActive to false',
        operationId: 'softDeleteIndustry',
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
            description: 'Industry deactivated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Industry deactivated successfully' },
                    data: {
                      $ref: '#/components/schemas/IndustryInfo',
                    },
                  },
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
                      _id: '507f1f77bcf86cd799439013',
                      name: 'Web Application',
                    },
                    {
                      _id: '507f1f77bcf86cd799439014',
                      name: 'Mobile Application',
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
      post: {
        tags: ['Project Types'],
        summary: 'Create new project type',
        description: 'Create a new project type',
        operationId: 'createProjectType',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateProjectTypeRequest',
              },
              example: {
                name: 'Mobile Application',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Project type created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Success',
                },
                example: {
                  success: true,
                  message: 'Project type created successfully',
                  data: {
                    _id: '507f1f77bcf86cd799439015',
                    name: 'Mobile Application',
                    isActive: true,
                    createdAt: '2024-01-15T10:30:00.000Z',
                    updatedAt: '2024-01-15T10:30:00.000Z',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad request - validation error',
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
            example: '507f1f77bcf86cd799439013',
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
      put: {
        tags: ['Project Types'],
        summary: 'Update project type',
        description: 'Update an existing project type',
        operationId: 'updateProjectType',
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
            example: '507f1f77bcf86cd799439013',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateProjectTypeRequest',
              },
              example: {
                name: 'Updated Mobile Application',
                isActive: true,
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Project type updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Success',
                },
                example: {
                  success: true,
                  message: 'Project type updated successfully',
                  data: {
                    _id: '507f1f77bcf86cd799439013',
                    name: 'Updated Mobile Application',
                    isActive: true,
                    createdAt: '2024-01-15T10:30:00.000Z',
                    updatedAt: '2024-01-15T11:00:00.000Z',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad request - validation error',
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
      delete: {
        tags: ['Project Types'],
        summary: 'Delete project type',
        description: 'Permanently delete a project type',
        operationId: 'deleteProjectType',
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
            example: '507f1f77bcf86cd799439013',
          },
        ],
        responses: {
          '200': {
            description: 'Project type deleted successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Success',
                },
                example: {
                  success: true,
                  message: 'Project type deleted successfully',
                  data: null,
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
    '/project-types/{id}/deactivate': {
      patch: {
        tags: ['Project Types'],
        summary: 'Deactivate project type',
        description: 'Soft delete (deactivate) a project type',
        operationId: 'softDeleteProjectType',
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
            example: '507f1f77bcf86cd799439013',
          },
        ],
        responses: {
          '200': {
            description: 'Project type deactivated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Success',
                },
                example: {
                  success: true,
                  message: 'Project type deactivated successfully',
                  data: {
                    _id: '507f1f77bcf86cd799439013',
                    name: 'Mobile Application',
                    isActive: false,
                    createdAt: '2024-01-15T10:30:00.000Z',
                    updatedAt: '2024-01-15T11:00:00.000Z',
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