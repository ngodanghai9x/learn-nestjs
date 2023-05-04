import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    Logger.log('Before...');

    const now = Date.now();
    // if catch error, after may not run
    // return next.handle();
    return next.handle().pipe(tap(() => Logger.log(`After... ${Date.now() - now}ms`)));
  }
}
