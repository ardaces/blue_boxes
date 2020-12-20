import { ApplicationEvent } from '../../event-bus/types/application-event.abstract';

export class DisplayedIdToggledEvent extends ApplicationEvent {
  constructor(
    readonly postIndex: number | null
  ) { super(); }
}
