import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { And, DataSource, Not, Raw, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserDetail } from 'src/entities/user_detail.entity';
import { Role } from 'src/entities/role.entity';
import { Queue, JobOptions } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { EQueue, UserMessage } from 'src/common/constants/queue';
import { IdentityService } from './identity.service';
import { ERole } from 'src/common/constants/role';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserDetail)
    private readonly userDetailRepository: Repository<UserDetail>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    // private readonly httpService: HttpService,
    private readonly dataSource: DataSource,
    @Inject(forwardRef(() => IdentityService))
    private readonly identityService: IdentityService,
    private readonly configService: ConfigService,
    @InjectQueue(EQueue.User)
    private readonly userQueue: Queue<UserMessage>,
  ) {}

  private readonly logger = new Logger(UserService.name);

  async initQueue() {
    this.appendQueue({ age: 1, name: 'abc' }, { priority: 2 });
    this.appendQueue({ age: 2, name: 'abc2' }, { priority: 1 });
    this.remove(123);
    this.identityService.hello(123);
  }

  async initRoles(): Promise<void> {
    const roles = await this.roleRepository.find();
    let res = null;
    if (!roles.length) {
      res = await this.roleRepository.save(
        [ERole.Admin, ERole.User].map((roleName) => ({ roleName, description: 'auto generate' })),
      );
    }
    this.logger.log(`initRoles: ${JSON.stringify(res)}`);
  }

  async initUser(): Promise<void> {
    const users = await this.userRepository.find();
    let res = null;
    if (!users.length) {
      res = await this.create({
        fullName: 'fullName',
        password: '123456',
        username: 'haind3',
        email: 'haind3@yopmail.com',
        moreDetail: 'more detail',
      });
    }
    this.logger.log(`initUser: ${JSON.stringify(res)}`);
  }

  async create(payload: CreateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { moreDetail, ...createUserDto } = payload;
      const role = await queryRunner.manager.findOne(Role, { where: { roleName: ERole.User } });
      const userResponse = await queryRunner.manager.save(User, {
        ...createUserDto,
        userStatus: 'active',
        roleId: role.id,
      });
      const userDetailResponse = await queryRunner.manager.save(UserDetail, {
        userId: userResponse.id,
        moreDetail,
      });
      this.logger.log('Saved userResponse id', userResponse.id);
      this.logger.log('Saved userDetailResponse id', userDetailResponse.id);

      await queryRunner.commitTransaction();

      return {
        userResponse,
        userDetailResponse,
      };
    } catch (err) {
      this.logger.error(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  appendQueue(obj: UserMessage, opts?: JobOptions) {
    this.logger.log(`appendQueue`, obj);
    this.userQueue.add(obj, opts);
  }

  async findAll() {
    const users = await this.userRepository.find({
      relations: {
        role: true,
        userDetail: true,
      },
    });
    return users;
  }

  async findOne(idOrEmail: string) {
    // const loadedPosts = await this.userRepository.findBy({
    //   // decimal: Raw('money - 4'),
    //   birthday: Raw((alias) => `${alias} > NOW()`),
    //   email: Raw((alias) => `${alias} IN (:...emails)`, {
    //     emails: ['Go To Statement Considered Harmful', 'Structured Programming'],
    //   }),
    // });
    return this.userRepository.findOne({
      // where: {
      //   id: +idOrEmail,
      //   role: {
      //     roleName: Not('admin'),
      //   },
      // },
      where: [
        { email: idOrEmail },
        { username: idOrEmail },
        // { or: [], and: [] },
        Number.isInteger(+idOrEmail)
          ? {
              id: +idOrEmail,
              // role: {
              //   roleName: Not('user'),
              // },
            }
          : {},
      ],
      relations: {
        userDetail: true,
        role: true,
      },
    });
    return this.userDetailRepository
      .findOne({
        select: {
          user: {
            password: false,
            id: true,
            username: true,
            email: true,
            fullName: true,
            role: {
              description: false,
              id: true,
              roleName: true,
            },
          },
        },
        where: {
          user: [{ email: idOrEmail }, Number.isInteger(+idOrEmail) ? { id: +idOrEmail } : {}],
        },
        relations: {
          user: { role: true },
        },
      })
      .then((data) => {
        Logger.log('🚀 ~ file: user.service.ts:131 ~ UserService ~ .then ~ data', data);
        const { user, ...userDetail } = data;
        return { ...user, userDetail };
      });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  hello(id: number) {
    return this.logger.log(`hello a #${id} user`);
  }

  remove(id: number) {
    this.identityService.remove(1);
    return this.logger.log(`This action removes a #${id} user`);
  }
}
