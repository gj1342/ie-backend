import mongoose, { Document, Schema } from 'mongoose';

export interface IProjectType extends Document {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectTypeSchema = new Schema<IProjectType>({
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
  collection: 'project_types',
});

ProjectTypeSchema.index({ id: 1 });
ProjectTypeSchema.index({ name: 1 });
ProjectTypeSchema.index({ isActive: 1 });

export const ProjectType = mongoose.model<IProjectType>('ProjectType', ProjectTypeSchema);

export enum ProjectTypeEnum {
  WEB_APP = 'web-application',
  MOBILE_APP = 'mobile-application',
  DESKTOP_SOFTWARE = 'desktop-software',
  IOT_PROJECT = 'iot-project',
  DATA_SCIENCE = 'data-science',
  MACHINE_LEARNING = 'machine-learning',
  GAME_DEVELOPMENT = 'game-development',
  BLOCKCHAIN = 'blockchain',
  API_DEVELOPMENT = 'api-development',
  MICROSERVICES = 'microservices',
  CLOUD_APPLICATION = 'cloud-application',
  AR_VR = 'ar-vr',
  CHATBOT = 'chatbot',
  AUTOMATION = 'automation',
  ANALYTICS = 'analytics',
}

export type ProjectTypeType = keyof typeof ProjectTypeEnum;