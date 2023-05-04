import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

// @Injectable()
export function AppendLogParamInterceptor2(param: string): NestInterceptor {
  return {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const customValue = param;
      request['append_log_param2'] = customValue;
      return next.handle();
    },
  };
}

// export function LogParam(keyId: string) {
//   return applyDecorators(
//     UseGuards(
//       class LogParamGuard implements CanActivate {
//         constructor(
//           private readonly reflector: Reflector,
//           private readonly config: ConfigService
//         ) {}

//         canActivate(context: ExecutionContext): boolean {
//           const request = context.switchToHttp().getRequest<FastifyRequest>();
//           const { body, query } = request;
//           console.log('🚀 ~ ivate ~ { body, query }:', { body, query });
//           request['whereId'] = keyId;
//           return true;
//         }
//       }
//     )
//   );
// }

