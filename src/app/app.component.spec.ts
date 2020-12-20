import { Post } from './core/types/post.interface';
import { EventBus } from './core/services/event-bus/event-bus.service';
import { ApplicationState } from './core/services/state/application-state.service';
import { of } from 'rxjs';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Component, DebugElement, Input } from '@angular/core';
import { PostsRequestedEvent } from './core/services/state/events/posts-requested-event.class';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-post-viewer',
  template: ``
})
// tslint:disable-next-line: component-class-suffix
class PostViewerComponentStub {
  @Input()
  post: any;

  @Input()
  postIndex: any;
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugEl: DebugElement;

  let eventBusMock: any;
  let applicationStateMock: any;

  const mockPost0 = { id: 1, userId: 2, title: 'testTitle0', body: 'testBody0' } as Post;
  const mockPost1 = { id: 2, userId: 3, title: 'testTitle1', body: 'testBody1' } as Post;


  beforeEach(async () => {
    eventBusMock = {
      dispatch(): void { }
    };

    applicationStateMock = {
      selectPosts: () => of([mockPost0, mockPost1])
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        PostViewerComponentStub
      ],
      providers: [
        { provide: ApplicationState, useValue: applicationStateMock },
        { provide: EventBus, useValue: eventBusMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('When loaded', () => {
    let dispatchSpy: jasmine.Spy;
    beforeEach(() => {
      dispatchSpy = spyOn(eventBusMock, 'dispatch');
      fixture.detectChanges();
    });
    it('Should dispatch event requesting posts', () => {
      expect(dispatchSpy)
        .toHaveBeenCalledOnceWith(
          new PostsRequestedEvent()
        );
    });
    it('Should display streamed posts', () => {
      const postViewers = debugEl.queryAll(
        By.directive(PostViewerComponentStub)
      ).map(el => el.componentInstance as PostViewerComponentStub);
      expect(postViewers.length).toBe(2);
      expect(postViewers[0].postIndex).toBe(0);
      expect(postViewers[0].post).toBe(mockPost0);
      expect(postViewers[1].postIndex).toBe(1);
      expect(postViewers[1].post).toBe(mockPost1);
    })
  });


});
