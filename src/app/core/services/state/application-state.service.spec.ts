import { DisplayedIdToggledEvent } from './events/displayed-id-toggled-event.class';
import { Post } from './../../types/post.interface';
import { PostsService } from './../posts/posts.service';
import { ConnectableObservable, of, Subject } from 'rxjs';
import { PostsRequestedEvent } from './events/posts-requested-event.class';
import { EventBus } from './../event-bus/event-bus.service';
import { ApplicationState } from './application-state.service';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { publish } from 'rxjs/operators';
import { ApplicationEvent } from '../event-bus/types/application-event.abstract';

describe('ApplicationStateService', () => {
  let applicationState: ApplicationState;

  const mockPost0 = { id: 1, userId: 2, title: 'testTitle0', body: 'testBody0' } as Post;
  const mockPost1 = { id: 2, userId: 3, title: 'testTitle1', body: 'testBody1' } as Post;

  let eventBusMock: any;
  let postServiceMock: any;

  beforeEach(() => {

    eventBusMock = {
      events$: new Subject<ApplicationEvent>()
    };

    postServiceMock = {
      getAll: () => of([mockPost0, mockPost1])
    };

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ApplicationState,
        { provide: EventBus, useValue: eventBusMock },
        { provide: PostsService, useValue: postServiceMock }
      ]
    });
    applicationState = TestBed.inject(ApplicationState);
  });

  it('should be created', () => {
    expect(applicationState).toBeTruthy();
  });

  describe('When an event for posts request is dispatched', () => {
    beforeEach(() => {
      eventBusMock.events$.next(new PostsRequestedEvent());
    });
    it('Should stream fresh posts', fakeAsync(() => {
      tick();
      applicationState.selectPosts().subscribe(
        posts => expect(posts).toEqual([mockPost0, mockPost1])
      );
    }));
    it('Should stream default viewer configurations', fakeAsync(() => {
      tick();
      applicationState.selectWhichIdToDisplay(0).subscribe(
        which => expect(which).toEqual('id')
      );
      applicationState.selectWhichIdToDisplay(1).subscribe(
        which => expect(which).toEqual('id')
      );
    }));
    describe('For a post', () => {
      const postIndex = 1;

      describe('When an event for toggling which id to display is dispatched', () => {
        beforeEach(() => {
          eventBusMock.events$.next(new DisplayedIdToggledEvent(postIndex));
        });
        it('Should stream new viewer configuration', fakeAsync(() => {
          tick();
          applicationState.selectWhichIdToDisplay(postIndex).subscribe(
            which => expect(which).toEqual('userId')
          );
        }));
      });
    });
  });
});
