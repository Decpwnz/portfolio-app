import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async submitContactForm(@Body() createContactDto: CreateContactDto) {
    return this.contactService.submitContactForm(createContactDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllSubmissions() {
    return this.contactService.getAllSubmissions();
  }
}
