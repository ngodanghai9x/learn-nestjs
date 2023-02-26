import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
// import { GraphQLUpload, Upload } from 'graphql-upload';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import Upload from 'graphql-upload/Upload.js';
import { FileUpload } from 'graphql-upload/processRequest.js';
// import { PubSub } from 'graphql-subscriptions';
import { UserService } from '../services/user.service';
import { User } from 'src/entities/user.entity';
import { createWriteStream } from 'fs';
import { join } from 'path';

// const pubSub = new PubSub();

// @InputType()
// export class CreateCatInput {
//   @Field(() => String)
//   name: string;
//   @Field(() => GraphQLUpload)
//   file: Promise<Upload>;
// }

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query((returns) => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query((returns) => [User])
  @ResolveField('users', (returns) => [User])
  // users(@Args() usersArgs: UserArgs): Promise<User[]> {
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // @Mutation((returns) => User)
  // async addUser(@Args('newUserData') newUserData: NewUserInput): Promise<User> {
  //   const user = await this.usersService.create(newUserData);
  //   pubSub.publish('userAdded', { userAdded: user });
  //   return user;
  // }

  @Mutation((returns) => Boolean)
  async removeUser(@Args('id') id: number) {
    return this.usersService.remove(id);
  }

  @Mutation(() => String)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
  ): Promise<string> {
    return new Promise(async (resolve) => {
      const { createReadStream, filename, mimetype, encoding } = file;
      console.log('🚀 ~ file: user.resolver.ts:61 ', {
        filename,
        mimetype,
        encoding,
      });
      const stream = createReadStream();
      // Xử lý stream tùy ý
      stream
        .pipe(createWriteStream(join(process.cwd(), `./public/upload/${filename}`)))
        .on('finish', () => resolve(`File ${filename} đã được upload thành công.`))
        .on('error', () => {
          new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
        });
    });
  }

  // async create({ name, file }: CreateCatInput) {
  //   const { createReadStream, filename } = await file;
  //   return new Promise(async (resolve) => {
  //     createReadStream()
  //       .pipe(createWriteStream(join(process.cwd(), `./public/upload/${filename}`)))
  //       .on('finish', () =>
  //         resolve({
  //           name,
  //           filename,
  //         }),
  //       )
  //       .on('error', () => {
  //         new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
  //       });
  //   });
  // }

  // @Subscription((returns) => User)
  // userAdded() {
  //   return pubSub.asyncIterator('userAdded');
  // }
}
