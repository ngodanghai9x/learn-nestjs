export {};

// import { ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
// import { Catch } from '@nestjs/common';
// import { FastifyReply } from 'fastify';
// import { EntityNotFoundError } from 'typeorm';
// import { GlobalResponseError } from './global.response.error';

// @Catch(EntityNotFoundError)
// export class EntityNotFoundExceptionFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost): void {
//     const context = host.switchToHttp();
//     const response: FastifyReply<any> = context.getResponse<FastifyReply>();
//     const [field] = (exception.constraint || exception.message).match(
//       /"[A-Za-z]+/g
//     );

//     const result = GlobalResponseError({
//       statusCode: HttpStatus.NOT_FOUND,
//       message: `${field?.replace('"', '')} is not exists!`,
//     });

//     response.code(HttpStatus.NOT_FOUND).send(result);
//   }
// }
