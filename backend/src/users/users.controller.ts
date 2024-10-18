import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ id: string; username: string }> {
    const user = await this.usersService.create(createUserDto);
    return { id: user.id, username: user.username };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@GetUser() user: User) {
    return { id: user.id, username: user.username, role: user.role };
  }

  @Patch('password')
  @UseGuards(AuthGuard('jwt'))
  async updatePassword(
    @GetUser() user: User,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    await this.usersService.updatePassword(
      user.userId,
      updatePasswordDto.newPassword,
    );
    return { message: 'Password updated successfully' };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('remove/:id')
  async removeUser(@Param('id') id: string) {
    const deletedUser = await this.usersService.remove(id);
    return {
      user: deletedUser,
      message: `User sucessfully deleted`,
    };
  }
}
