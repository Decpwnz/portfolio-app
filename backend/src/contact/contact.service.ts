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

  async getAllSubmissions() {
    return this.contactSubmissionModel.find().sort({ createdAt: -1 }).exec();
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
