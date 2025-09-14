import mongoose, { Document, Schema } from 'mongoose';

export interface IProjectType extends Document {
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectTypeSchema = new Schema<IProjectType>({
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
  collection: 'project_types',
});

ProjectTypeSchema.index({ name: 1 });
ProjectTypeSchema.index({ isActive: 1 });

export const ProjectType = mongoose.model<IProjectType>('ProjectType', ProjectTypeSchema);