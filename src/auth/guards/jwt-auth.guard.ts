import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('JwtAuthGuard', context);
    // not sure that type Request of express is correct
    const req = context.switchToHttp().getRequest<Request>();
    console.log('switchToHttp', req.body);

    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
