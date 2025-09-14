# InnovativeSphere Backend

An AI-powered capstone project idea generator backend built with Node.js, Express, TypeScript, and MongoDB. This API helps students and professionals discover personalized project concepts based on their interests, target industry, and preferred project type using Mistral AI.

## 🚀 Features

- **AI-Powered Idea Generation**: Generate unique project ideas using Mistral AI with intelligent prompting
- **Industry & Project Type Management**: Full CRUD operations for industries and project types
- **RESTful API**: Clean, well-documented REST endpoints with comprehensive error handling
- **Type Safety**: Full TypeScript implementation with strict typing and custom error classes
- **Database Integration**: MongoDB with Mongoose ODM and connection pooling
- **API Documentation**: Interactive Swagger/OpenAPI 3.0 documentation
- **Input Validation**: Joi-based request validation with database-driven validation
- **Security**: Helmet, CORS, rate limiting, input sanitization, and graceful shutdown
- **Error Handling**: Centralized error handling with custom error classes and response helpers
- **Dependency Injection**: Clean architecture with service injection pattern

## 🛠️ Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js 5.x
- **Language**: TypeScript (Strict Mode)
- **Database**: MongoDB with Mongoose ODM
- **AI Integration**: Mistral AI API (mistral-small-latest model)
- **HTTP Client**: Axios with retry logic
- **Validation**: Joi with database-driven validation
- **Documentation**: Swagger/OpenAPI 3.0 with interactive UI
- **Security**: Helmet, CORS, Express Rate Limit
- **Logging**: Morgan HTTP request logger
- **Environment**: dotenv for configuration management

## 📁 Project Structure

```
src/
├── config/                 # Configuration files
│   ├── database.ts         # MongoDB connection with pooling
│   ├── env.ts             # Environment variables management
│   ├── openapi.ts         # OpenAPI 3.0 specification
│   └── swagger.ts         # Swagger UI configuration
├── constants/             # Application constants
│   └── index.ts           # HTTP status codes, error/success messages
├── controllers/           # Request handlers with dependency injection
│   ├── IdeaController.ts  # AI idea generation controller
│   ├── IndustryController.ts # Industry CRUD controller
│   └── ProjectTypeController.ts # Project type CRUD controller
├── middleware/            # Custom middleware
│   ├── validation.ts      # Joi validation with database validation
│   └── index.ts
├── models/                # Mongoose schemas and interfaces
│   ├── Industry.ts        # Industry schema (name, isActive, timestamps)
│   ├── ProjectType.ts     # Project type schema (name, isActive, timestamps)
│   ├── Idea.ts           # Idea interfaces for AI responses
│   └── index.ts
├── routes/                # API route definitions
│   ├── health.ts         # Health check endpoint
│   ├── ideas.ts          # AI idea generation routes
│   ├── industries.ts     # Industry CRUD routes
│   ├── project-types.ts  # Project type CRUD routes
│   └── index.ts
├── services/              # Business logic layer
│   ├── IdeaService.ts    # AI integration and idea processing
│   ├── IndustryService.ts # Industry business logic
│   ├── ProjectTypeService.ts # Project type business logic
│   ├── ValidationService.ts # Database-driven validation
│   ├── MistralService.ts # Mistral AI API integration
│   └── index.ts
├── schemas/               # OpenAPI schema definitions
│   └── api.schemas.ts    # Reusable API schemas
├── types/                 # TypeScript type definitions
│   └── api.ts            # API-related interfaces
├── utils/                 # Utility functions
│   ├── ResponseHelper.ts # Centralized response formatting
│   └── ErrorHandler.ts   # Custom error classes
├── app.ts                # Express app configuration
└── server.ts             # Server entry point with graceful shutdown
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- Mistral AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ie-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=3000
   HOST=0.0.0.0
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   MISTRAL_API_KEY=your_mistral_api_key
   MISTRAL_API_URL=https://api.mistral.ai/v1
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

   **Note**: The database will be automatically connected. You can add industries and project types directly through MongoDB Compass or the API endpoints.

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:3000/api-docs
- **OpenAPI JSON**: http://localhost:3000/api-docs.json
- **Health Check**: http://localhost:3000/api/v1/health

## 🔗 API Endpoints

### Health Check
- `GET /api/v1/health` - API health status

### Ideas (AI-Powered)
- `POST /api/v1/ideas/generate` - Generate a project idea using Mistral AI

### Industries (CRUD Operations)
- `GET /api/v1/industries` - Get all active industries
- `GET /api/v1/industries/search?q=query` - Search industries by name
- `GET /api/v1/industries/:id` - Get industry by MongoDB _id
- `POST /api/v1/industries` - Create new industry
- `PUT /api/v1/industries/:id` - Update industry
- `DELETE /api/v1/industries/:id` - Hard delete industry
- `PATCH /api/v1/industries/:id/deactivate` - Soft delete industry

### Project Types (CRUD Operations)
- `GET /api/v1/project-types` - Get all active project types
- `GET /api/v1/project-types/search?q=query` - Search project types by name
- `GET /api/v1/project-types/:id` - Get project type by MongoDB _id
- `POST /api/v1/project-types` - Create new project type
- `PUT /api/v1/project-types/:id` - Update project type
- `DELETE /api/v1/project-types/:id` - Hard delete project type
- `PATCH /api/v1/project-types/:id/deactivate` - Soft delete project type

## 📝 Example Usage

### Generate an AI-Powered Idea
```bash
curl -X POST http://localhost:3000/api/v1/ideas/generate \
  -H "Content-Type: application/json" \
  -d '{
    "industry": "Healthcare",
    "projectType": "Web Development",
    "userInterests": ["machine learning", "user experience"],
    "complexity": "intermediate"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Idea generated successfully",
  "data": {
    "idea": {
      "id": "idea_1692123456789_abc123def",
      "title": "AI-Powered Patient Health Monitoring System",
      "description": "A comprehensive web application that uses machine learning to monitor patient health...",
      "industry": "Healthcare",
      "projectType": "Web Development",
      "complexity": "intermediate",
      "estimatedDuration": "3-6 months",
      "technologies": ["React", "Node.js", "TensorFlow", "MongoDB"],
      "features": ["Real-time monitoring", "Predictive analytics", "Patient dashboard"],
      "objectives": ["Learn ML integration", "Build scalable web app", "Understand healthcare data"],
      "challenges": ["Data privacy compliance", "Real-time processing", "Model accuracy"],
      "generatedAt": "2024-01-15T10:30:00.000Z"
    },
    "generatedAt": "2024-01-15T10:30:00.000Z"
  },
  "meta": {
    "apiVersion": "v1",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

### Get All Industries
```bash
curl http://localhost:3000/api/v1/industries
```

### Create New Industry
```bash
curl -X POST http://localhost:3000/api/v1/industries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Renewable Energy"
  }'
```

### Search Project Types
```bash
curl "http://localhost:3000/api/v1/project-types/search?q=mobile"
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload (nodemon + ts-node)
- `npm run build` - Build TypeScript to JavaScript
- `npm run build:watch` - Build TypeScript with watch mode
- `npm run start` - Start production server
- `npm run clean` - Clean build directory
- `npm run test` - Run tests (placeholder)
- `npm run lint` - Run linter (placeholder)

## 🗄️ Database Schema

### Industries Collection
```typescript
{
  _id: ObjectId,        // MongoDB auto-generated ID
  name: string,         // Industry name (e.g., "Healthcare")
  isActive: boolean,    // Soft delete flag (default: true)
  createdAt: Date,      // Creation timestamp
  updatedAt: Date       // Last update timestamp
}
```

### Project Types Collection
```typescript
{
  _id: ObjectId,        // MongoDB auto-generated ID
  name: string,         // Project type name (e.g., "Web Development")
  isActive: boolean,    // Soft delete flag (default: true)
  createdAt: Date,      // Creation timestamp
  updatedAt: Date       // Last update timestamp
}
```

### Idea Response Structure
```typescript
{
  id: string,                    // Generated idea ID
  title: string,                 // Project title
  description: string,           // Detailed description
  industry: string,              // Industry name
  projectType: string,           // Project type name
  complexity: 'beginner' | 'intermediate' | 'advanced',
  estimatedDuration: string,     // Duration estimate
  technologies: string[],        // Suggested technologies
  features: string[],           // Key features
  objectives: string[],         // Learning objectives
  challenges: string[],         // Potential challenges
  generatedAt: string           // Generation timestamp
}
```

## 🔒 Security Features

- **Helmet**: Security headers and XSS protection
- **CORS**: Configurable cross-origin resource sharing
- **Rate Limiting**: API request rate limiting (100 requests per 15 minutes)
- **Input Validation**: Joi schema validation with database verification
- **Environment Variables**: Sensitive data protection (API keys, database URIs)
- **Error Handling**: Secure error responses without sensitive data exposure
- **Graceful Shutdown**: Proper server termination handling
- **Type Safety**: TypeScript strict mode for compile-time error prevention

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
MONGO_URI=your_production_mongodb_uri
MISTRAL_API_KEY=your_production_mistral_key
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
ALLOWED_ORIGINS=https://yourdomain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@innovativesphere.com or create an issue in the repository.

## 🔮 Roadmap

- [x] **Mistral AI Integration** - AI-powered idea generation
- [x] **MongoDB Integration** - Database with Mongoose ODM
- [x] **CRUD Operations** - Full CRUD for industries and project types
- [x] **API Documentation** - Swagger/OpenAPI 3.0 documentation
- [x] **Error Handling** - Custom error classes and centralized handling
- [x] **Input Validation** - Database-driven validation with Joi
- [ ] **User Authentication** - JWT-based authentication system
- [ ] **Idea Management** - Save, favorite, and manage generated ideas
- [ ] **Advanced Filtering** - Complex search and filter options
- [ ] **Analytics Dashboard** - Usage analytics and reporting
- [ ] **Rate Limiting Per User** - Individual user rate limits
- [ ] **Caching Layer** - Redis for improved performance
- [ ] **Testing Suite** - Comprehensive unit and integration tests
- [ ] **Docker Support** - Containerization for easy deployment
- [ ] **CI/CD Pipeline** - Automated testing and deployment

---

**Built with ❤️ for the developer community**
