import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectConnection() private connection: Connection,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('db-test')
  async testDatabase() {
    try {
      const collections = await this.connection.db.listCollections().toArray();
      return {
        message: 'Database connection successful',
        collections: collections.map((c) => c.name),
      };
    } catch (error) {
      return { message: 'Database connection failed', error: error.message };
    }
  }
}
