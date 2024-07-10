import { IsAlphanumeric, IsDateString, IsEmail, IsNumberString, IsString, MaxLength } from 'class-validator';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Field, ObjectType, Int, ID, Float, GraphQLTimestamp, GraphQLISODateTime } from '@nestjs/graphql';

import { Role } from './role.entity';
import { UserDetail } from './user_detail.entity';

@ObjectType()
@Entity({ name: 'users' })
export class User {
    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }

    @Field((type) => ID, { nullable: false })
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Field()
    @IsString()
    @Column({ name: 'username', unique: true })
    username: string;

    @Field()
    @Column()
    password: string;

    @IsString()
    @Column({ name: 'full_name' })
    fullName: string;

    // one to one force unique??
    // @Column({ name: 'user_detail_id', unique: false })
    // userDetailId: number;

    @Field((type) => UserDetail)
    @OneToOne(() => UserDetail)
    @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
    userDetail?: UserDetail;

    @Field((type) => ID)
    @Column({ name: 'role_id' })
    roleId: number;

    @Field(() => Role)
    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: 'role_id', referencedColumnName: 'id' }) // column name, entity field name
    role?: Role;

    @Field()
    @Column()
    @IsEmail()
    email: string;

    @Field({ nullable: true })
    @Column({ name: 'phone', nullable: true })
    @IsNumberString()
    phone: string;

    @Field({ nullable: true })
    // @Field((type) => Date, { nullable: true })
    // @Field((type) => GraphQLISODateTime, { nullable: true })
    @Column({ name: 'birthday', type: 'date', nullable: true })
    @IsDateString()
    birthday: Date;

    @Field({ nullable: true })
    @Column({ name: 'bank_number', nullable: true })
    @IsNumberString()
    bankNumber: string;

    // @Column({ name: 'money', nullable: true, type: 'money' })
    // money: number;

    // @Column({ name: 'locked_money', nullable: true, type: 'smallmoney' })
    // lockedMoney: number;

    @Field({ nullable: true })
    @Column({ name: 'decimal', nullable: true, type: 'decimal', default: 0 })
    decimalNum: number;

    @Field({ nullable: true })
    @Column({ name: 'anti_phishing_code', nullable: true })
    @IsAlphanumeric()
    @MaxLength(20)
    antiPhishingCode: string;

    @Field({ nullable: false })
    @Column({ name: 'user_status', nullable: false, default: '' })
    @IsString()
    @MaxLength(20)
    userStatus: string;

    @Field((type) => GraphQLTimestamp, { nullable: false })
    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    // @Column("timestamp", { precision: 3, default: () => "CURRENT_TIMESTAMP(3)", onUpdate: "CURRENT_TIMESTAMP(3)"})
    @Field((type) => GraphQLTimestamp, { nullable: false })
    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;
}
