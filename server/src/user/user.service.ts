import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from '../utils/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async getUsersService() {
    const users = await this.userRepository.find();

    if (!users || !users.length) throw new HttpException('Users does not exist', HttpStatus.CONFLICT);

    return users;
  }

  async getUserService(userId) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) throw new HttpException('User does not exist', HttpStatus.CONFLICT);

    return user;
  }

  async deleteUserService(userId) {
    const deletedUser = await this.userRepository.delete({ id: userId });

    if (!deletedUser.affected) throw new HttpException('User does not exist', HttpStatus.CONFLICT);

    return deletedUser;
  }

  async updateUserService(userId, data) {
    const existingUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!existingUser) throw new HttpException('User does not exist', HttpStatus.CONFLICT);

    const updatedUser = await this.userRepository.update(userId, { ...existingUser, ...data });

    if (!updatedUser.affected) throw new HttpException('User does not update', HttpStatus.CONFLICT);

    return updatedUser;
  }
}
