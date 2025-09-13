import { Industry, IIndustry } from '../models/Industry';
import { HTTP_STATUS, ERROR_MESSAGES } from '../constants';

export class IndustryService {
  async getAllIndustries(): Promise<IIndustry[]> {
    try {
      const industries = await Industry.find({ isActive: true })
        .select('id name description')
        .sort({ name: 1 });
      
      return industries;
    } catch (error) {
      console.error('Error fetching industries:', error);
      throw new Error('Failed to fetch industries');
    }
  }

  async getIndustryById(id: string): Promise<IIndustry | null> {
    try {
      const industry = await Industry.findOne({ id, isActive: true })
        .select('id name description');
      
      return industry;
    } catch (error) {
      console.error('Error fetching industry by ID:', error);
      throw new Error('Failed to fetch industry');
    }
  }

  async searchIndustries(query: string): Promise<IIndustry[]> {
    try {
      const industries = await Industry.find({
        isActive: true,
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      })
        .select('id name description')
        .sort({ name: 1 });
      
      return industries;
    } catch (error) {
      console.error('Error searching industries:', error);
      throw new Error('Failed to search industries');
    }
  }
}