import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from 'src/utils/typeorm/entities/Follower';
import { FollowerController } from './follower.controller';
import { FollowerService } from './follower.service';

@Module({
  imports: [TypeOrmModule.forFeature([Follower])],
  controllers: [FollowerController],
  providers: [FollowerService],
})
export class FollowerModule {}
