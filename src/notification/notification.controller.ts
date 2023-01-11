import { Controller, Get, MessageEvent, Res, Sse } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { interval } from 'rxjs/internal/observable/interval';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger/dist';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  staticFrontend(@Res() res: Response) {
    const html = readFileSync(
      join(__dirname, '..', '..', '..', 'my_services', 'front-end', 'index.html'),
    );
    console.log('🚀 html', html.toString());
    res.type('text/html').send(html.toString());
  }

  @Sse('sse')
  sse() {
    return interval(2000).pipe(map((_) => ({ data: { hello: 'world' } })));
  }

  @Sse('low-level/spam')
  sse2() {
    return this.notificationService.sendSpamNotificationLowLevel();
  }

  @Sse('low-level')
  sse3(@Res() res: Response) {
    // res.sse
    return this.notificationService.sendNotificationLowLevel();
  }

  @Sse('high-level/spam')
  sse4() {
    return this.notificationService.sendSpamNotificationHighLevel();
  }

  @Sse('high-level')
  sse5() {
    return this.notificationService.sendNotificationHighLevel();
  }
}
