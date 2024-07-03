import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Field, ObjectType, Int, ID, Float, GraphQLTimestamp } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
@Entity({ name: 'user_details' })
export class UserDetail {
    constructor(partial: Partial<UserDetail>) {
        Object.assign(this, partial);
    }

    @Field((type) => ID, { nullable: false })
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Field({ nullable: true })
    @Column({ name: 'more_detail', nullable: true })
    moreDetail: string;

    // one to one force unique??
    // declare name field or using https://www.npmjs.com/package/typeorm-naming-strategies
    @Column({ name: 'user_id', unique: false })
    userId: number;

    @Field((type) => User, { nullable: false })
    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user?: User;
}
