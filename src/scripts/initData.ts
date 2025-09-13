import { connectDatabase, disconnectDatabase } from '../config/database';
import { Industry, IndustryEnum } from '../models/Industry';
import { ProjectType, ProjectTypeEnum } from '../models/ProjectType';

const initializeData = async () => {
  try {
    await connectDatabase();
    console.log('🔌 Connected to MongoDB');

    const industries = [
      {
        id: IndustryEnum.HEALTHCARE,
        name: 'Healthcare',
        description: 'Medical, pharmaceutical, and health-related projects',
        isActive: true,
      },
      {
        id: IndustryEnum.EDUCATION,
        name: 'Education',
        description: 'Educational technology and learning platforms',
        isActive: true,
      },
      {
        id: IndustryEnum.FINANCE,
        name: 'Finance',
        description: 'Banking, fintech, and financial services',
        isActive: true,
      },
      {
        id: IndustryEnum.TECHNOLOGY,
        name: 'Technology',
        description: 'Software development and IT solutions',
        isActive: true,
      },
      {
        id: IndustryEnum.ECOMMERCE,
        name: 'E-commerce',
        description: 'Online retail and marketplace platforms',
        isActive: true,
      },
      {
        id: IndustryEnum.MANUFACTURING,
        name: 'Manufacturing',
        description: 'Industrial and production management systems',
        isActive: true,
      },
      {
        id: IndustryEnum.ENTERTAINMENT,
        name: 'Entertainment',
        description: 'Media, gaming, and entertainment platforms',
        isActive: true,
      },
      {
        id: IndustryEnum.TRANSPORTATION,
        name: 'Transportation',
        description: 'Logistics, mobility, and transportation solutions',
        isActive: true,
      },
    ];

    const projectTypes = [
      {
        id: ProjectTypeEnum.WEB_APP,
        name: 'Web Application',
        description: 'Browser-based applications and web platforms',
        isActive: true,
      },
      {
        id: ProjectTypeEnum.MOBILE_APP,
        name: 'Mobile Application',
        description: 'iOS and Android mobile applications',
        isActive: true,
      },
      {
        id: ProjectTypeEnum.DESKTOP_SOFTWARE,
        name: 'Desktop Software',
        description: 'Cross-platform desktop applications',
        isActive: true,
      },
      {
        id: ProjectTypeEnum.IOT_PROJECT,
        name: 'IoT Project',
        description: 'Internet of Things and connected devices',
        isActive: true,
      },
      {
        id: ProjectTypeEnum.DATA_SCIENCE,
        name: 'Data Science',
        description: 'Data analysis and visualization projects',
        isActive: true,
      },
      {
        id: ProjectTypeEnum.MACHINE_LEARNING,
        name: 'Machine Learning',
        description: 'AI and machine learning applications',
        isActive: true,
      },
      {
        id: ProjectTypeEnum.GAME_DEVELOPMENT,
        name: 'Game Development',
        description: 'Video games and interactive entertainment',
        isActive: true,
      },
      {
        id: ProjectTypeEnum.BLOCKCHAIN,
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
