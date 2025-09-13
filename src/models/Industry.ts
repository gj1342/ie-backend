import mongoose, { Document, Schema } from 'mongoose';

export interface IIndustry extends Document {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const IndustrySchema = new Schema<IIndustry>({
  id: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
  collection: 'industries',
});

IndustrySchema.index({ id: 1 });
IndustrySchema.index({ name: 1 });
IndustrySchema.index({ isActive: 1 });

export const Industry = mongoose.model<IIndustry>('Industry', IndustrySchema);

export enum IndustryEnum {
  HEALTHCARE = 'healthcare',
  EDUCATION = 'education',
  FINANCE = 'finance',
  TECHNOLOGY = 'technology',
  ECOMMERCE = 'ecommerce',
  MANUFACTURING = 'manufacturing',
  ENTERTAINMENT = 'entertainment',
  TRANSPORTATION = 'transportation',
  REAL_ESTATE = 'real-estate',
  AGRICULTURE = 'agriculture',
  ENERGY = 'energy',
  GOVERNMENT = 'government',
  NON_PROFIT = 'non-profit',
  SPORTS = 'sports',
  TRAVEL = 'travel',
}

export type IndustryType = keyof typeof IndustryEnum;