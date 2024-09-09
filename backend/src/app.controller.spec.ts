import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getConnectionToken } from '@nestjs/mongoose';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: getConnectionToken(),
          useValue: {
            db: {
              listCollections: jest.fn().mockReturnValue({
                toArray: jest.fn().mockResolvedValue([]),
              }),
            },
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('db-test', () => {
    it('should return successful database connection message', async () => {
      const result = await appController.testDatabase();
      expect(result).toEqual({
        message: 'Database connection successful',
        collections: [],
      });
    });
  });
});
