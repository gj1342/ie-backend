import { Industry, IIndustry } from '../models/Industry';
import { DatabaseError, ValidationError, NotFoundError } from '../utils/ErrorHandler';

export interface CreateIndustryData {
  name: string;
}

export interface UpdateIndustryData {
  name?: string;
  isActive?: boolean;
}

export class IndustryService {
  async getAllIndustries(): Promise<IIndustry[]> {
    try {
      const industries = await Industry.find({ isActive: true })
        .select('name')
        .sort({ name: 1 });
      
      return industries;
    } catch (error) {
      console.error('Error fetching industries:', error);
      throw new DatabaseError('Failed to fetch industries', error as Error);
    }
  }

  async getIndustryById(id: string): Promise<IIndustry | null> {
    try {
      const industry = await Industry.findOne({ _id: id, isActive: true })
        .select('name');
      
      return industry;
    } catch (error) {
      console.error('Error fetching industry by ID:', error);
      throw new DatabaseError('Failed to fetch industry', error as Error);
    }
  }

  async searchIndustries(query: string): Promise<IIndustry[]> {
    try {
      const industries = await Industry.find({
        isActive: true,
        name: { $regex: query, $options: 'i' }
      })
        .select('name')
        .sort({ name: 1 });
      
      return industries;
    } catch (error) {
      console.error('Error searching industries:', error);
      throw new DatabaseError('Failed to search industries', error as Error);
    }
  }

  async createIndustry(data: CreateIndustryData): Promise<IIndustry> {
    try {
      const industry = new Industry({
        name: data.name.trim(),
        isActive: true
      });

      const savedIndustry = await industry.save();
      return savedIndustry;
    } catch (error) {
      console.error('Error creating industry:', error);
      throw new DatabaseError('Failed to create industry', error as Error);
    }
  }

  async updateIndustry(id: string, data: UpdateIndustryData): Promise<IIndustry> {
    try {
      const industry = await Industry.findOne({ _id: id });
      if (!industry) {
        throw new NotFoundError('Industry');
      }

      if (data.name !== undefined) {
        industry.name = data.name.trim();
      }
      if (data.isActive !== undefined) {
        industry.isActive = data.isActive;
      }

      const updatedIndustry = await industry.save();
      return updatedIndustry;
    } catch (error) {
      console.error('Error updating industry:', error);
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError('Failed to update industry', error as Error);
    }
  }

  async deleteIndustry(id: string): Promise<void> {
    try {
      const industry = await Industry.findOne({ _id: id });
      if (!industry) {
        throw new NotFoundError('Industry');
      }

      await Industry.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error deleting industry:', error);
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError('Failed to delete industry', error as Error);
    }
  }

  async softDeleteIndustry(id: string): Promise<IIndustry> {
    try {
      const industry = await Industry.findOne({ _id: id });
      if (!industry) {
        throw new NotFoundError('Industry');
      }

      industry.isActive = false;
      const updatedIndustry = await industry.save();
      return updatedIndustry;
    } catch (error) {
      console.error('Error soft deleting industry:', error);
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError('Failed to soft delete industry', error as Error);
    }
  }
}