import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ContactService } from './contact.service';
import { ContactSubmission } from './schemas/contact-submission.schema';
import { Model } from 'mongoose';

describe('ContactService', () => {
  let service: ContactService;
  let model: Model<ContactSubmission>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: getModelToken(ContactSubmission.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            countDocuments: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ContactService>(ContactService);
    model = module.get<Model<ContactSubmission>>(
      getModelToken(ContactSubmission.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of submissions', async () => {
      const submissions = [
        { name: 'John Doe', email: 'john@example.com', message: 'Hello' },
      ];
      jest.spyOn(model, 'find').mockReturnValue({
        select: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(submissions),
      } as any);
      jest.spyOn(model, 'countDocuments').mockResolvedValueOnce(1);

      const result = await service.findAll(1, 10, 'createdAt', 'desc', '');
      expect(result).toEqual({ submissions, total: 1 });
    });
  });

  // Add more tests for other methods like submitContactForm, markAsRead, and remove
});
