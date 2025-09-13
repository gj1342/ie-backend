import app from './app';
import { env } from './config/env';
import { connectDatabase, disconnectDatabase } from './config/database';

const startServer = async () => {
  try {
    await connectDatabase();
    
    const server = app.listen(env.PORT, env.HOST, () => {
      console.log(`🚀 InnovativeSphere API server running on ${env.HOST}:${env.PORT}`);
      console.log(`📊 Environment: ${env.NODE_ENV}`);
      console.log(`🔗 Health check: http://${env.HOST}:${env.PORT}/api/v1/health`);
      console.log(`📚 API Documentation: http://${env.HOST}:${env.PORT}/api-docs`);
    });

    const gracefulShutdown = async (signal: string) => {
      console.log(`${signal} received, shutting down gracefully`);
      
      server.close(async (err) => {
        if (err) {
          console.error('Error during server shutdown:', err);
          process.exit(1);
        }
        
        await disconnectDatabase();
        console.log('Server closed successfully');
        process.exit(0);
      });

      setTimeout(() => {
        console.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      gracefulShutdown('UNCAUGHT_EXCEPTION');
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      gracefulShutdown('UNHANDLED_REJECTION');
    });

    return server;
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;