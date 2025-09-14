import { connectDatabase, disconnectDatabase } from '../config/database';
import { Industry } from '../models/Industry';
import { ProjectType } from '../models/ProjectType';

const initializeData = async () => {
  try {
    await connectDatabase();
    console.log('🔌 Connected to MongoDB');

    const industries = [
      {
        id: 'healthcare',
        name: 'Healthcare',
        description: 'Medical, pharmaceutical, and health-related projects',
        isActive: true,
      },
      {
        id: 'education',
        name: 'Education',
        description: 'Educational technology and learning platforms',
        isActive: true,
      },
      {
        id: 'finance',
        name: 'Finance',
        description: 'Banking, fintech, and financial services',
        isActive: true,
      },
      {
        id: 'technology',
        name: 'Technology',
        description: 'Software development and IT solutions',
        isActive: true,
      },
      {
        id: 'ecommerce',
        name: 'E-commerce',
        description: 'Online retail and marketplace platforms',
        isActive: true,
      },
      {
        id: 'manufacturing',
        name: 'Manufacturing',
        description: 'Industrial and production management systems',
        isActive: true,
      },
      {
        id: 'entertainment',
        name: 'Entertainment',
        description: 'Media, gaming, and entertainment platforms',
        isActive: true,
      },
      {
        id: 'transportation',
        name: 'Transportation',
        description: 'Logistics, mobility, and transportation solutions',
        isActive: true,
      },
    ];

    const projectTypes = [
      {
        id: 'web-application',
        name: 'Web Application',
        description: 'Browser-based applications and web platforms',
        isActive: true,
      },
      {
        id: 'mobile-application',
        name: 'Mobile Application',
        description: 'iOS and Android mobile applications',
        isActive: true,
      },
      {
        id: 'desktop-software',
        name: 'Desktop Software',
        description: 'Cross-platform desktop applications',
        isActive: true,
      },
      {
        id: 'iot-project',
        name: 'IoT Project',
        description: 'Internet of Things and connected devices',
        isActive: true,
      },
      {
        id: 'data-science',
        name: 'Data Science',
        description: 'Data analysis and visualization projects',
        isActive: true,
      },
      {
        id: 'machine-learning',
        name: 'Machine Learning',
        description: 'AI and machine learning applications',
        isActive: true,
      },
      {
        id: 'game-development',
        name: 'Game Development',
        description: 'Video games and interactive entertainment',
        isActive: true,
      },
      {
        id: 'blockchain',
        name: 'Blockchain',
        description: 'Decentralized applications and smart contracts',
        isActive: true,
      },
    ];

    await Industry.deleteMany({});
    await ProjectType.deleteMany({});

    await Industry.insertMany(industries);
    await ProjectType.insertMany(projectTypes);

    console.log('✅ Industries and Project Types initialized successfully');
    console.log(`📊 Created ${industries.length} industries`);
    console.log(`📊 Created ${projectTypes.length} project types`);

  } catch (error) {
    console.error('❌ Error initializing data:', error);
  } finally {
    await disconnectDatabase();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
};

initializeData();
