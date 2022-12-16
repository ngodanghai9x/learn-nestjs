import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class IdentityService {
  private readonly logger = new Logger(IdentityService.name);
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  remove(id: number) {
    // this.userService.remove(1);
    return console.log(`${IdentityService.name} This action removes a #${id} identity`);
  }

  hello(id: number) {
    this.userService.hello(1);
    return console.log(`${IdentityService.name} hello a #${id} identity`);
  }
}
