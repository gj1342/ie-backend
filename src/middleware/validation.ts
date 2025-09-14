import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { HTTP_STATUS } from '../constants';
import { ValidationService } from '../services/ValidationService';

export const validateIdeaRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const schema = Joi.object({
    industry: Joi.string().required().messages({
      'any.required': 'Industry is required',
      'string.empty': 'Industry cannot be empty'
    }),
    projectType: Joi.string().required().messages({
      'any.required': 'Project type is required',
      'string.empty': 'Project type cannot be empty'
    }),
    userInterests: Joi.array().items(Joi.string()).min(1).required().messages({
      'any.required': 'User interests are required',
      'array.min': 'At least one user interest is required',
      'array.base': 'User interests must be an array'
    }),
    complexity: Joi.string().valid('beginner', 'intermediate', 'advanced').optional().messages({
      'any.only': 'Complexity must be one of: beginner, intermediate, advanced'
    })
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: 'Validation Error',
      message: error.details?.[0]?.message || 'Validation error',
      details: error.details
    });
    return;
  }

  try {
    const { industry, projectType } = req.body;
    
    const isIndustryValid = await ValidationService.validateIndustry(industry);
    const isProjectTypeValid = await ValidationService.validateProjectType(projectType);

    if (!isIndustryValid) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: 'Validation Error',
        message: 'Invalid industry selected'
      });
      return;
    }

    if (!isProjectTypeValid) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: 'Validation Error',
        message: 'Invalid project type selected'
      });
      return;
    }

    next();
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: 'Validation Error',
      message: 'Error validating request data'
    });
  }
};

export const validateId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;
  
  if (!id || id.trim() === '') {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: 'Validation Error',
      message: 'ID parameter is required'
    });
    return;
  }

  next();
};

export const validateSearchQuery = (req: Request, res: Response, next: NextFunction): void => {
  const { q } = req.query;
  
  if (!q || typeof q !== 'string' || q.trim() === '') {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: 'Validation Error',
      message: 'Search query is required and must be a non-empty string'
    });
    return;
  }

  next();
};

export const validateCreateIndustry = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .min(2)
      .max(100)
      .trim()
      .messages({
        'any.required': 'Industry name is required',
        'string.empty': 'Industry name cannot be empty',
        'string.min': 'Industry name must be at least 2 characters',
        'string.max': 'Industry name cannot exceed 100 characters'
      })
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: 'Validation Error',
      message: error.details?.[0]?.message || 'Validation error',
      details: error.details
    });
    return;
  }

  next();
};

export const validateUpdateIndustry = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(100)
      .trim()
      .optional()
      .messages({
        'string.min': 'Industry name must be at least 2 characters',
        'string.max': 'Industry name cannot exceed 100 characters'
      }),
    isActive: Joi.boolean()
      .optional()
      .messages({
        'boolean.base': 'isActive must be a boolean value'
      })
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update'
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: 'Validation Error',
      message: error.details?.[0]?.message || 'Validation error',
      details: error.details
    });
    return;
  }

  next();
};

export const validateCreateProjectType = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .min(2)
      .max(100)
      .trim()
      .messages({
        'any.required': 'Project type name is required',
        'string.empty': 'Project type name cannot be empty',
        'string.min': 'Project type name must be at least 2 characters',
        'string.max': 'Project type name cannot exceed 100 characters'
      })
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: 'Validation Error',
      message: error.details?.[0]?.message || 'Validation error',
      details: error.details
    });
    return;
  }

  next();
};

export const validateUpdateProjectType = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(100)
      .trim()
      .optional()
      .messages({
        'string.min': 'Project type name must be at least 2 characters',
        'string.max': 'Project type name cannot exceed 100 characters'
      }),
    isActive: Joi.boolean()
      .optional()
      .messages({
        'boolean.base': 'isActive must be a boolean value'
      })
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update'
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: 'Validation Error',
      message: error.details?.[0]?.message || 'Validation error',
      details: error.details
    });
    return;
  }

  next();
};