import { Injectable, OnModuleInit, Logger, MessageEvent } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { UtilityService } from 'src/common/utils/utility.service';
@Injectable()
export class NotificationService implements OnModuleInit {
  private logger = new Logger(NotificationService.name);
  constructor(private readonly utilityService: UtilityService) {}

  async onModuleInit() {
    this.logger.log('Notification service has been initialized.');
  }

  private getNotification(message: string): MessageEvent {
    const data = { message, upper: message.toUpperCase() };
    return { data };
  }

  sendNotificationLowLevel(message: string = 'default message'): Observable<MessageEvent> {
    // await this.utilityService.sleep(500);
    // const arr = ['d1', 'd2', 'd3'];
    // return new Observable((subscriber) => {
    //   while (arr.length) {
    //     subscriber.next(this.getNotification(arr.pop())); // data have to return in every chunk
    //   }
    //   // if (arr.length == 0) subscriber.complete(); // complete the subscription
    // });
    const observable = new Observable<MessageEvent>((observer) => {
      observer.next(this.getNotification(message));
      observer.next(this.getNotification(message + 2));
      // observer.complete();
      // observer.unsubscribe();
    });
    return observable;
  }

  sendSpamNotificationLowLevel(message: string = 'default message'): Observable<MessageEvent> {
    // await this.utilityService.sleep(500);
    const subject = new Subject<MessageEvent>();
    subject.next(this.getNotification(message));
    subject.next(this.getNotification(message + 2));
    subject.complete();
    return subject.asObservable();
  }

  sendNotificationHighLevel(message: string = 'default message'): Observable<MessageEvent> {
    // await this.utilityService.sleep(500);
    const observable = Rx.from([1, 2, 3]).pipe(Rx.map((num) => ({ data: { num } })));
    return observable;
  }

  sendSpamNotificationHighLevel(message: string = 'default message'): Observable<MessageEvent> {
    // await this.utilityService.sleep(500);
    const observable = Rx.from([1, 2, 3]).pipe(Rx.map((num) => ({ data: { num } })));
    return observable;
  }
}
