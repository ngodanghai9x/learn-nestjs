import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

@Injectable()
export class EmailSvService {
  constructor(@Inject('EMAIL_MICRO_SERVICE') private readonly emailClient: ClientProxy) {}

  sendEmail() {
    const pattern = { cmd: 'send_email' };
    const payload = { name: 'req res NDH', age: 15 };
    return this.emailClient.send<string, object>(pattern, payload).pipe(timeout(5000));
  }

  emitSendEmail() {
    const payload = { name: 'event emit NDH', age: 15 };
    return this.emailClient.emit<string, object>('send_email', payload).pipe(timeout(5000));
  }
}
