import { Post } from './../../core/types/post.interface';
import { EventBus } from './../../core/services/event-bus/event-bus.service';
import { ApplicationState } from './../../core/services/state/application-state.service';
import { Subject, Observable } from 'rxjs';
import { DisplayedId } from './../../core/services/state/types/displayed-id.type';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PostViewerComponent } from './post-viewer.component';
import { DebugElement } from '@angular/core';
import { DisplayedIdToggledEvent } from 'src/app/core/services/state/events/displayed-id-toggled-event.class';

describe('PostViewerComponent', () => {
  let component: PostViewerComponent;
  let fixture: ComponentFixture<PostViewerComponent>;
  let debugEl: DebugElement;

  let eventBusMock: any;
  let applicationStateMock: any;
  const $whichId = new Subject<DisplayedId>();

  beforeEach(async () => {
    eventBusMock = {
      dispatch(): void { }
    };

    applicationStateMock = {
      selectWhichIdToDisplay(postViewerIndex: number): Observable<DisplayedId> {
        return $whichId.asObservable();
      }
    };

    await TestBed.configureTestingModule({
      declarations: [PostViewerComponent],
      providers: [
        { provide: ApplicationState, useValue: applicationStateMock },
        { provide: EventBus, useValue: eventBusMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostViewerComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When clicked', () => {
    let dispatchSpy: jasmine.Spy;
    const postViewerIndex = 8;
    beforeEach(() => {
      dispatchSpy = spyOn(eventBusMock, 'dispatch');
      component.postIndex = postViewerIndex;
    });

    it('Should dispatch event for toggling displayed id with it\'s index as payload', () => {
      debugEl.triggerEventHandler('click', null);
      expect(dispatchSpy)
        .toHaveBeenCalledOnceWith(
          new DisplayedIdToggledEvent(postViewerIndex)
        );
    });
  });

  describe('When provided with post data', () => {
    const mockPost0 = { id: 1, userId: 2, title: 'testTitle0', body: 'testBody0' } as Post;
    const postViewerIndex = 6;
    beforeEach(() => {
      component.post = mockPost0;
      component.postIndex = postViewerIndex;
    });
    it('Should display post title, post body and initially post \'id\'', () => {
      component.displayedId$.subscribe(
        id => expect(id).toBe(mockPost0.id)
      );
      component.postTitle$.subscribe(
        title => expect(title).toBe(mockPost0.title)
      );
      component.postBody$.subscribe(
        body => expect(body).toBe(mockPost0.body)
      );
    });

    describe('When id to display changes for the post', () => {
      beforeEach(() => {
        $whichId.next('userId');
      })
      it('Should update it\'s output accordingly', fakeAsync(() => {
        tick();
        component.displayedId$.subscribe(
          displayedId => expect(displayedId).toBe(mockPost0.userId)
        );
      }));
    })
  });

});
