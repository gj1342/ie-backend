import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { HTTP_STATUS } from '../constants';
import { IndustryEnum, ProjectTypeEnum } from '../models';

export const validateIdeaRequest = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    industry: Joi.string().valid(...Object.values(IndustryEnum)).required().messages({
      'any.required': 'Industry is required',
      'string.empty': 'Industry cannot be empty',
      'any.only': 'Industry must be a valid industry type'
    }),
    projectType: Joi.string().valid(...Object.values(ProjectTypeEnum)).required().messages({
      'any.required': 'Project type is required',
      'string.empty': 'Project type cannot be empty',
      'any.only': 'Project type must be a valid project type'
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

  next();
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