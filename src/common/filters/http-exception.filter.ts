import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
/*
 * When an exception is not handled by your application code, it is caught by this layer,
 * which then automatically sends an appropriate user-friendly response.
 *
 * When an exception is unrecognized (is neither HttpException nor a class that inherits from HttpException),
 * the built-in exception filter generates the following
 */

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    try {
      console.log('HttpExceptionFilter exception', exception);
      const status = exception.getStatus();
      const exceptionRes = exception.getResponse();

      response.status(status).json({
        message: exception?.message,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        exceptionRes,
        class: HttpExceptionFilter.name,
      });
    } catch (error) {
      response.status(998).json({
        timestamp: new Date().toISOString(),
        path: request.url,
        class: HttpExceptionFilter.name + 2,
      });
    }
  }
}
