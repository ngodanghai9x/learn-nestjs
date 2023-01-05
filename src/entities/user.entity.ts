import {
  IsAlphanumeric,
  IsDateString,
  IsEmail,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';
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
import { Role } from './role.entity';
import { UserDetail } from './user_detail.entity';

@Entity({ name: 'users' })
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @IsString()
  @Column({ name: 'username', unique: true })
  username: string;

  @Column()
  password: string;

  @IsString()
  @Column({ name: 'full_name' })
  fullName: string;

  // one to one force unique??
  // @Column({ name: 'user_detail_id', unique: false })
  // userDetailId: number;

  @OneToOne(() => UserDetail)
  userDetail: UserDetail;

  @Column({ name: 'role_id' })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role;

  @Column()
  @IsEmail()
  email: string;

  @Column({ name: 'phone', nullable: true })
  @IsNumberString()
  phone: string;

  @Column({ name: 'birthday', type: 'date', nullable: true })
  @IsDateString()
  birthday: Date;

  @Column({ name: 'bank_number', nullable: true })
  @IsNumberString()
  bankNumber: string;

  @Column({ name: 'money', nullable: true })
  money: number;

  @Column({ name: 'locked_money', nullable: true })
  lockedMoney: number;

  @Column({ name: 'anti_phishing_code', nullable: true })
  @IsAlphanumeric()
  @MaxLength(20)
  antiPhishingCode: string;

  @Column({ name: 'user_status', nullable: false })
  @IsString()
  @MaxLength(20)
  userStatus: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
