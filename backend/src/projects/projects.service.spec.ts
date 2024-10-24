import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ProjectsService } from './projects.service';
import { Project } from './schemas/project.schema';
import { Model } from 'mongoose';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let model: Model<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getModelToken(Project.name),
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

    service = module.get<ProjectsService>(ProjectsService);
    model = module.get<Model<Project>>(getModelToken(Project.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of projects', async () => {
      const projects = [
        { title: 'Test Project', description: 'Test Description' },
      ];
      jest.spyOn(model, 'find').mockReturnValue({
        select: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(projects),
      } as any);
      jest.spyOn(model, 'countDocuments').mockResolvedValueOnce(1);

      const result = await service.findAll(1, 10, 'createdAt', 'desc', '');
      expect(result).toEqual({ projects, total: 1 });
    });
  });

  // Add more tests for other methods like create, findOne, update, and remove
});
