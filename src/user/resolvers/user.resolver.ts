import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
// import { PubSub } from 'graphql-subscriptions';
// import { NewUserInput } from './dto/new-user.input';
// import { UserArgs } from './dto/users.args';
import { UserService } from '../services/user.service';
import { User } from 'src/entities/user.entity';

// const pubSub = new PubSub();

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

  // @Subscription((returns) => User)
  // userAdded() {
  //   return pubSub.asyncIterator('userAdded');
  // }
}
