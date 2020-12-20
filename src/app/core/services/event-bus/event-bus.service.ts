import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { ApplicationEvent } from './types/application-event.abstract';

@Injectable()
export class EventBus {

  private readonly $events = new Subject<ApplicationEvent>();
  readonly events$ = this.$events.pipe(
    share()
  );

  constructor() {}

  dispatch(event: ApplicationEvent): void {
    this.$events.next(event);
  }
}
