export {};

// import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
// import { Catch } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { FastifyReply, FastifyRequest } from 'fastify';
// import { QueryFailedError } from 'typeorm';
// import { GlobalResponseError } from './global.response.error';

// @Catch(QueryFailedError)
// export class SqlQueryExceptionFilter implements ExceptionFilter {
//   constructor(public reflector: Reflector) {}

//   catch(exception: any, host: ArgumentsHost): void {
//     const context = host.switchToHttp();
//     const response: FastifyReply<any> = context.getResponse<FastifyReply>();

//     if (['ER_DUP_ENTRY', '23505'].includes(exception.code)) {
//       const found = (exception.constraint || exception.message).match(
//         /UQ_([a-zA-Z]*)/
//       );
//       const field = found?.[1];

//       const result = GlobalResponseError({
//         statusCode: 409,
//         message: `${field} is exists`,
//       });
//       response.code(409).send(result);
//       return;
//     }

//     response.code(500).send({
//       statusCode: 500,
//       message: exception.message,
//     });
//   }
// }
