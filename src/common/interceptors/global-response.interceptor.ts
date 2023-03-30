import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
// import { getI18nContextFromRequest } from 'nestjs-i18n';
import { I18nContext } from 'nestjs-i18n';
import { map, Observable } from 'rxjs';

export interface IResponseSuccess<T> {
  statusCode: number;
  status: string;
  data: T;
}

@Injectable()
export class GlobalResponseInterceptor<T> implements NestInterceptor<T, IResponseSuccess<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponseSuccess<T>> {
    const request = context.switchToHttp().getRequest();
    // const i18n = getI18nContextFromRequest(request);
    const i18n = I18nContext.current(context);
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        statusCode: HttpStatus.OK,
        data: data?.message ? i18n?.t(data.message) : data,
      })),
    );
  }
}
