export const API_VERSION = '1.0.0';

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
  INVALID_JSON: 'Invalid JSON in request body',
  ROUTE_NOT_FOUND: 'Route not found',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  TOO_MANY_REQUESTS: 'Too many requests from this IP, please try again later.',
  BAD_REQUEST: 'Bad Request',
  NOT_FOUND: 'Not Found',
  VALIDATION_ERROR: 'Validation Error',
} as const;

export const SUCCESS_MESSAGES = {
  API_RUNNING: 'InnovativeSphere API is running',
  SERVER_SHUTDOWN: 'Server closed successfully',
  DATA_RETRIEVED: 'Data retrieved successfully',
  IDEA_GENERATED: 'Idea generated successfully',
} as const;
