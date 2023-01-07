import { Injectable, CanActivate, Logger } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { User } from 'src/entities/user.entity';

@Injectable()
// package: passport-local
export class LocalAuthGuard extends AuthGuard('local') implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    Logger.log(LocalAuthGuard.name, 'switchToHttp', req.body);

    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(
    err: any,
    user: Omit<User, 'password'>,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    Logger.log(LocalAuthGuard.name, `handleRequest`, err, user, info, status);
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return { ...user, from: LocalAuthGuard.name } as any;
  }
}
