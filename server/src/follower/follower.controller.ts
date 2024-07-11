import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { FollowerService } from './follower.service';

@Controller('follower')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Get()
  async getFollowers() {
    return await this.followerService.getFollowersService();
  }

  @Get(':id')
  async getFollower(@Param('id', ParseIntPipe) followerId: number) {
    return await this.followerService.getFollowerService(followerId);
  }

  @Post()
  async createFollower(@Body() data) {
    return await this.followerService.createFollowerService(data);
  }

  @Delete(':id')
  async deleteFollower(@Param('id', ParseIntPipe) followerId: number) {
    return await this.followerService.deleteFollowerService(followerId);
  }

  @Patch(':id')
  async updateFollower(@Param('id', ParseIntPipe) followerId: number, @Body() data) {
    return await this.followerService.updateFollowerService(followerId, data);
  }
}
