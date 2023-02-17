import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'roles' })
export class Role {
  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'role_name', nullable: false })
  roleName: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
