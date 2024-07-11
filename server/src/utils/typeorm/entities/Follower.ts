import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'followers' })
export class Follower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  follower_id: number;
}
