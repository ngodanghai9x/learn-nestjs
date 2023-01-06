import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    console.log(AllExceptionsFilter.name, 'exception =>', exception);
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      message: exception?.message,
      statusCode: httpStatus,
      timestamp: new Date().getTime(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      class: AllExceptionsFilter.name,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
