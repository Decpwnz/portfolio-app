import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactSubmission } from './schemas/contact-submission.schema';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(ContactSubmission.name)
    private contactSubmissionModel: Model<ContactSubmission>,
  ) {}

  async submitContactForm(createContactDto: CreateContactDto) {
    const newSubmission = new this.contactSubmissionModel(createContactDto);
    await newSubmission.save();
    return { message: 'Form submitted successfully' };
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    sortField: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
    filter: string = '',
  ): Promise<{ submissions: ContactSubmission[]; total: number }> {
    try {
      const skip = (page - 1) * limit;
      const sortOptions = { [sortField]: sortOrder };

      const filterRegex = new RegExp(filter, 'i');
      const filterQuery = filter
        ? {
            $or: [
              { name: filterRegex },
              { email: filterRegex },
              { message: filterRegex },
            ],
          }
        : {};

      const [submissions, total] = await Promise.all([
        this.contactSubmissionModel
          .find(filterQuery)
          .select('name email createdAt isRead') // Limit fields
          .sort(sortOptions)
          .skip(skip)
          .limit(limit)
          .exec(),
        this.contactSubmissionModel.countDocuments(filterQuery),
      ]);

      return { submissions, total };
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      throw new Error('Could not fetch contact submissions');
    }
  }

  async markAsRead(id: string): Promise<ContactSubmission> {
    return this.contactSubmissionModel
      .findByIdAndUpdate(id, { isRead: true }, { new: true })
      .exec();
  }

  async remove(id: string): Promise<ContactSubmission> {
    return this.contactSubmissionModel.findByIdAndDelete(id).exec();
  }
}
