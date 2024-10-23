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
  ): Promise<{ submissions: ContactSubmission[]; total: number }> {
    const skip = (page - 1) * limit;
    const [submissions, total] = await Promise.all([
      this.contactSubmissionModel.find().skip(skip).limit(limit).exec(),
      this.contactSubmissionModel.countDocuments(),
    ]);
    return { submissions, total };
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
