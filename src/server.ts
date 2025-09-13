import 'dotenv/config';
import app from './app';
import { env } from './config/env';
import { connectDatabase, disconnectDatabase } from './config/database';

class Server {
  private server: any;
  private isShuttingDown = false;
  private readonly SHUTDOWN_TIMEOUT = 10000;

  async start(): Promise<void> {
    try {
      console.log('🚀 Starting InnovativeSphere API server...');
      
      await this.connectToDatabase();
      this.startHttpServer();
      this.setupGracefulShutdown();
      this.setupErrorHandlers();
      
      console.log('✅ Server started successfully');
    } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  }

  private async connectToDatabase(): Promise<void> {
    try {
      await connectDatabase();
      console.log('✅ Database connected successfully');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  private startHttpServer(): void {
    this.server = app.listen(env.PORT, env.HOST, () => {
      console.log(`🌐 Server running on ${env.HOST}:${env.PORT}`);
      console.log(`📊 Environment: ${env.NODE_ENV}`);
      console.log(`🔗 Health check: http://${env.HOST}:${env.PORT}/api/v1/health`);
      console.log(`📚 API Documentation: http://${env.HOST}:${env.PORT}/api-docs`);
    });

    this.server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.syscall !== 'listen') {
        throw error;
      }

      const bind = typeof env.PORT === 'string' ? `Pipe ${env.PORT}` : `Port ${env.PORT}`;

      switch (error.code) {
        case 'EACCES':
          console.error(`❌ ${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(`❌ ${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    });
  }

  private setupGracefulShutdown(): void {
    const gracefulShutdown = async (signal: string): Promise<void> => {
      if (this.isShuttingDown) {
        console.log('⚠️ Shutdown already in progress, ignoring signal:', signal);
        return;
      }

      this.isShuttingDown = true;
      console.log(`\n🛑 ${signal} received, shutting down gracefully...`);

      const shutdownTimeout = setTimeout(() => {
        console.error('❌ Forced shutdown after timeout');
        process.exit(1);
      }, this.SHUTDOWN_TIMEOUT);

      try {
        await this.closeHttpServer();
        await this.disconnectFromDatabase();
        
        clearTimeout(shutdownTimeout);
        console.log('✅ Server closed successfully');
        process.exit(0);
      } catch (error) {
        console.error('❌ Error during shutdown:', error);
        process.exit(1);
      }
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  }

  private setupErrorHandlers(): void {
    process.on('uncaughtException', (error: Error) => {
      console.error('❌ Uncaught Exception:', error);
      this.gracefulShutdown('UNCAUGHT_EXCEPTION');
    });

    process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
      console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
      this.gracefulShutdown('UNHANDLED_REJECTION');
    });
  }

  private async closeHttpServer(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.server) {
        resolve();
        return;
      }

      this.server.close((error: Error | undefined) => {
        if (error) {
          reject(error);
        } else {
          console.log('✅ HTTP server closed');
          resolve();
        }
      });
    });
  }

  private async disconnectFromDatabase(): Promise<void> {
    try {
      await disconnectDatabase();
      console.log('✅ Database disconnected');
    } catch (error) {
      console.error('❌ Error disconnecting from database:', error);
      throw error;
    }
  }

  private async gracefulShutdown(signal: string): Promise<void> {
    if (this.isShuttingDown) {
      return;
    }

    this.isShuttingDown = true;
    console.log(`\n🛑 ${signal} received, shutting down gracefully...`);

    const shutdownTimeout = setTimeout(() => {
      console.error('❌ Forced shutdown after timeout');
      process.exit(1);
    }, this.SHUTDOWN_TIMEOUT);

    try {
      await this.closeHttpServer();
      await this.disconnectFromDatabase();
      
      clearTimeout(shutdownTimeout);
      console.log('✅ Server closed successfully');
      process.exit(0);
    } catch (error) {
      console.error('❌ Error during shutdown:', error);
      process.exit(1);
    }
  }
}

const server = new Server();
server.start().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});

export default app;