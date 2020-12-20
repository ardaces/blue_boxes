import { EventBus } from './event-bus.service';
import { TestBed } from '@angular/core/testing';
import { ApplicationEvent } from './types/application-event.abstract';

class SomeEvent implements ApplicationEvent {
  constructor(
    readonly payload: string
  ) {}
}

describe('EventBusService', () => {
  let eventBus: EventBus;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        EventBus
      ]
    });
    eventBus = TestBed.inject(EventBus);
  });

  it('should be created', () => {
    expect(eventBus).toBeTruthy();
  });

  describe('When an application event is dispatched', () => {
    const eventPayload = 'event payload';
    const event = new SomeEvent('event payload');

    it('Should be available through events$ api with it\'s payload', () => {
      let eventReceived!: ApplicationEvent;
      eventBus.events$.subscribe(
        e => eventReceived = e
      );
      eventBus.dispatch(event);
      expect(eventReceived instanceof SomeEvent).toBeTrue();
      const eventReceivedDerived = eventReceived as SomeEvent;
      expect(eventReceivedDerived.payload).toBe(eventPayload);
    });
  });
});
