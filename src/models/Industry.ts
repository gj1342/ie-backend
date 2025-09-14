import mongoose, { Document, Schema } from 'mongoose';

export interface IIndustry extends Document {
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const IndustrySchema = new Schema<IIndustry>({
  name: {
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

IndustrySchema.index({ name: 1 });
IndustrySchema.index({ isActive: 1 });

export const Industry = mongoose.model<IIndustry>('Industry', IndustrySchema);