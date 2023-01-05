import { Injectable, CanActivate } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') implements CanActivate {
  // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
  //   console.log(LocalAuthGuard.name, context);
  //   const req = context.switchToHttp().getRequest<Request>();
  //   console.log('switchToHttp', req.body);

  //   // Add your custom authentication logic here
  //   // for example, call super.logIn(request) to establish a session.
  //   return super.canActivate(context);
  // }

  handleRequest(
    err: any,
    user: Omit<User, 'password'>,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    console.log(`handleRequest`, LocalAuthGuard.name, err, user, info, status);
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return { ...user, from: LocalAuthGuard.name } as any;
  }
}
