import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Follower } from 'src/utils/typeorm/entities/Follower';
import { Repository } from 'typeorm';

@Injectable()
export class FollowerService {
  constructor(@InjectRepository(Follower) private readonly followerRepository: Repository<Follower>) {}

  async getFollowersService() {
    const followers = await this.followerRepository.find();

    return followers;
  }

  async getFollowerService(followerId) {
    const follower = await this.followerRepository.find({
      where: { user_id: followerId },
    });

    return follower;
  }

  async createFollowerService(data) {
    const createFollower = await this.followerRepository.create(data);

    return this.followerRepository.save(createFollower);
  }

  async deleteFollowerService(followerId) {
    const deletedTask = await this.followerRepository.delete({ id: followerId });

    return deletedTask;
  }

  async updateFollowerService(followerId, data) {
    const existingFollower = await this.followerRepository.findOne({
      where: { id: followerId },
    });

    const updateFollower = await this.followerRepository.update(followerId, { ...existingFollower, ...data });

    return updateFollower;
  }
}
