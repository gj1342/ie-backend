# InnovativeSphere Backend

An AI-powered capstone project idea generator backend built with Node.js, Express, TypeScript, and MongoDB. This API helps students and professionals discover personalized project concepts based on their interests, target industry, and preferred project type.

## 🚀 Features

- **AI-Powered Idea Generation**: Generate unique project ideas using Mistral AI
- **Industry & Project Type Management**: Comprehensive database of industries and project types
- **RESTful API**: Clean, well-documented REST endpoints
- **Type Safety**: Full TypeScript implementation with strict typing
- **Database Integration**: MongoDB with Mongoose ODM
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Input Validation**: Joi-based request validation
- **Security**: Helmet, CORS, rate limiting, and input sanitization
- **Error Handling**: Comprehensive error handling and logging

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **AI Integration**: Mistral AI API
- **Validation**: Joi
- **Documentation**: Swagger/OpenAPI 3.0
- **Security**: Helmet, CORS, Express Rate Limit
- **Logging**: Morgan

## 📁 Project Structure

```
src/
├── config/                 # Configuration files
│   ├── database.ts         # MongoDB connection
│   ├── env.ts             # Environment variables
│   ├── openapi.ts         # OpenAPI specification
│   └── swagger.ts         # Swagger UI configuration
├── constants/             # Application constants
│   └── index.ts           # HTTP status codes, messages
├── controllers/           # Request handlers
│   ├── IdeaController.ts
│   ├── IndustryController.ts
│   ├── ProjectTypeController.ts
│   └── index.ts
├── middleware/            # Custom middleware
│   ├── validation.ts      # Joi validation middleware
│   └── index.ts
├── models/                # Data models
│   ├── Industry.ts        # Industry Mongoose schema
│   ├── ProjectType.ts     # Project type Mongoose schema
│   ├── Idea.ts           # Idea interfaces
│   └── index.ts
├── routes/                # API routes
│   ├── health.ts         # Health check endpoint
│   ├── ideas.ts          # Idea generation routes
│   ├── industries.ts     # Industry management routes
│   ├── project-types.ts  # Project type routes
│   └── index.ts
├── services/              # Business logic
│   ├── IdeaService.ts
│   ├── IndustryService.ts
│   ├── ProjectTypeService.ts
│   └── index.ts
├── scripts/               # Utility scripts
│   └── initData.ts       # Database initialization
├── types/                 # TypeScript type definitions
│   └── api.ts
├── utils/                 # Utility functions
├── app.ts                # Express app configuration
└── server.ts             # Server entry point
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

4. **Initialize Database**
   ```bash
   npm run init-data
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:3000/api-docs
- **OpenAPI JSON**: http://localhost:3000/api-docs.json
- **Health Check**: http://localhost:3000/api/v1/health

## 🔗 API Endpoints

### Health Check
- `GET /api/v1/health` - API health status

### Ideas
- `POST /api/v1/ideas/generate` - Generate a project idea

### Industries
- `GET /api/v1/industries` - Get all industries
- `GET /api/v1/industries/search?q=query` - Search industries
- `GET /api/v1/industries/:id` - Get industry by ID

### Project Types
- `GET /api/v1/project-types` - Get all project types
- `GET /api/v1/project-types/search?q=query` - Search project types
- `GET /api/v1/project-types/:id` - Get project type by ID

## 📝 Example Usage

### Generate an Idea
```bash
curl -X POST http://localhost:3000/api/v1/ideas/generate \
  -H "Content-Type: application/json" \
  -d '{
    "industry": "healthcare",
    "projectType": "web-application",
    "userInterests": ["AI", "user experience"],
    "complexity": "intermediate"
  }'
```

### Get All Industries
```bash
curl http://localhost:3000/api/v1/industries
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run init-data` - Initialize database with sample data
- `npm run clean` - Clean build directory

## 🗄️ Database Schema

### Industries Collection
```typescript
{
  _id: ObjectId,
  id: string,           // Unique identifier (e.g., "healthcare")
  name: string,         // Display name (e.g., "Healthcare")
  description: string,  // Description of the industry
  isActive: boolean,    // Soft delete flag
  createdAt: Date,
  updatedAt: Date
}
```

### Project Types Collection
```typescript
{
  _id: ObjectId,
  id: string,           // Unique identifier (e.g., "web-application")
  name: string,         // Display name (e.g., "Web Application")
  description: string,  // Description of the project type
  isActive: boolean,    // Soft delete flag
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: API request rate limiting
- **Input Validation**: Joi schema validation
- **Environment Variables**: Sensitive data protection
- **Error Handling**: Secure error responses

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

- [ ] User authentication and authorization
- [ ] Idea saving and favorites
- [ ] Advanced filtering options
- [ ] Analytics and reporting
- [ ] Rate limiting per user
- [ ] Caching layer (Redis)
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline

---

**Built with ❤️ for the developer community**
