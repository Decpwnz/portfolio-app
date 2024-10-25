import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    sortField: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
    filter: string = '',
  ): Promise<{ projects: Project[]; total: number }> {
    try {
      const skip = (page - 1) * limit;
      const sortOptions = { [sortField]: sortOrder };

      const filterRegex = new RegExp(filter, 'i');
      const filterQuery = filter
        ? {
            $or: [
              { title: filterRegex },
              { description: filterRegex },
              { technologies: filterRegex },
              { imageUrl: filterRegex },
              { projectUrl: filterRegex },
            ],
          }
        : {};

      const [projects, total] = await Promise.all([
        this.projectModel
          .find(filterQuery)
          .select(
            'title description createdAt technologies imageUrl projectUrl',
          )
          .sort(sortOptions)
          .skip(skip)
          .limit(limit)
          .exec(),
        this.projectModel.countDocuments(filterQuery),
      ]);

      return { projects, total };
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw new Error('Could not fetch projects');
    }
  }

  async findOne(id: string): Promise<Project> {
    return this.projectModel.findById(id).exec();
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Project> {
    return this.projectModel.findByIdAndDelete(id).exec();
  }
}
