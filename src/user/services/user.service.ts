import { forwardRef, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserDetail } from '../entities/user_detail.entity';
import { Role } from '../entities/role.entity';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { EQueue, UserMessage } from 'src/common/constants/queue';
import { IdentityService } from './identity.service';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // private readonly httpService: HttpService,
    private readonly dataSource: DataSource,
    @Inject(forwardRef(() => IdentityService))
    private readonly identityService: IdentityService,
    private readonly configService: ConfigService,
    @InjectQueue(EQueue.User)
    private readonly userQueue: Queue<UserMessage>,
  ) {}

  onModuleInit() {
    this.logger.log(`The module ${UserService.name} has been initialized.`);
    // this.userQueue.add({ age: 1, name: 'abc' }, { priority: 2 });
    // this.userQueue.add({ age: 2, name: 'abc2' }, { priority: 1 });
    this.remove(123);
    this.identityService.hello(123);
  }

  async create(createUserDto: CreateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const role = await queryRunner.manager.findOne(Role, {});
      const userResponse = await queryRunner.manager.save(User, {
        ...createUserDto,
        roleId: role.id,
      });
      const userDetailResponse = await queryRunner.manager.save(UserDetail, {
        userId: userResponse.id,
        moreDetail: '',
      });
      console.log('Saved userResponse id', userResponse.id);
      console.log('Saved userDetailResponse id', userDetailResponse.id);
      await queryRunner.commitTransaction();
    } catch (err) {
      this.logger.error(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(username: string) {
    return { username, password: '123' } as User;
    // return this.userRepository.findOne({ where: { username } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  hello(id: number) {
    return console.log(`${UserService.name} hello a #${id} user`);
  }

  remove(id: number) {
    this.identityService.remove(1);
    return console.log(`${UserService.name} This action removes a #${id} user`);
  }
}
