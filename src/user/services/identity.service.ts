import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class IdentityService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  private readonly logger = new Logger(IdentityService.name);

  remove(id: number) {
    // this.userService.remove(1);
    return this.logger.log(`This action removes a #${id} identity`);
  }

  hello(id: number) {
    this.userService.hello(1);
    return this.logger.log(`hello a #${id} identity`);
  }
}
