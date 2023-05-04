import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AppendLogParamInterceptor implements NestInterceptor {
  // key: string;
  // constructor(key: string) {
  //   this.key = key;
  // }
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    Logger.log('Before...');
    const request = context.switchToHttp().getRequest();
    const customValue = this.reflector.get<string>('customValue', context.getHandler());

    request['append_log_param'] = customValue;
    // if catch error, after may not run
    return next.handle();
  }
}
