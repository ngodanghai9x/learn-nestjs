import { Injectable, CanActivate, Logger } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { User } from 'src/entities/user.entity';

@Injectable()
// package: passport-jwt
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
  //   throw new Error('Method not implemented.');
  // }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    console.log(JwtAuthGuard.name, 'switchToHttp', req.body);

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
    console.log(JwtAuthGuard.name, `handleRequest`, err, user, info, status);
    // You can throw an exception based on either "info" or "err" arguments
    err = err || info instanceof Error ? info : null;
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return { ...user, from: JwtAuthGuard.name } as any;
  }
}
