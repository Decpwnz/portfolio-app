import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  async submitContactForm(createContactDto: CreateContactDto) {
    // TODO: Implement email sending logic
    console.log('Form submission received:', createContactDto);
    return { message: 'Form submitted successfully' };
  }
}
