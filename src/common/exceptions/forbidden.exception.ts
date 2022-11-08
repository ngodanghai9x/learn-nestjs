import { HttpException, HttpStatus } from '@nestjs/common';

// throw new HttpException({
//   status: HttpStatus.FORBIDDEN,
//   error: 'This is a custom message',
// }, HttpStatus.FORBIDDEN);

// create your own exceptions hierarchy to avoid override Exception body response like above

export class MyForbiddenException extends HttpException {
  constructor() {
    super('My Forbidden', HttpStatus.FORBIDDEN);
  }
}
