import { Body, Controller, Post, Get, Delete, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsersService();
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) userId: number) {
    return await this.userService.getUserService(userId);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) userId: number) {
    return await this.userService.deleteUserService(userId);
  }

  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) userId: number, @Body() data) {
    return await this.userService.updateUserService(userId, data);
  }
}
