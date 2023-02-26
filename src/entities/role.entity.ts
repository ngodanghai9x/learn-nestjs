import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Field, ObjectType, Int, ID, Float, GraphQLTimestamp } from '@nestjs/graphql';

import { User } from './user.entity';

@ObjectType()
@Entity({ name: 'roles' })
export class Role {
  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }

  @Field((type) => ID, { nullable: false })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  // @Directive('@upper')
  @Field({ nullable: false })
  @Column({ name: 'role_name', nullable: false })
  roleName: string;

  @Field({ nullable: true })
  @Column({ name: 'description', nullable: true })
  description: string;

  @Field((type) => User, { nullable: false })
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
