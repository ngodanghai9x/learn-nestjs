import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_details' })
export class UserDetail {
  constructor(partial: Partial<UserDetail>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'more_detail', nullable: true })
  moreDetail: string;

  // one to one force unique??
  // declare name field or using https://www.npmjs.com/package/typeorm-naming-strategies
  @Column({ name: 'user_id', unique: false })
  userId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;
}
