import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user_details' })
export class UserDetail {
  constructor(partial: Partial<UserDetail>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column()
  moreDetail: string;
}
