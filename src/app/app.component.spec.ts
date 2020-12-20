import { PostsService } from './core/services/posts/posts.service';
import { Post } from './core/types/post.interface';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { Component, DebugElement, ChangeDetectionStrategy, Input } from '@angular/core';
import { By } from '@angular/platform-browser';


@Component({
  selector: 'app-post-viewer',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line: component-class-suffix
class PostViewerComponentStub {
  @Input()
  post: Post | null = null;
}


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let debugEl: DebugElement;
  let component: AppComponent;

  const mockPost0 = { id: 1, userId: 2, title: 'testTitle0', body: 'testBody0' } as Post;
  const mockPost1 = { id: 2, userId: 3, title: 'testTitle1', body: 'testBody1' } as Post;

  const postsServiceSpy = jasmine.createSpyObj(
    'PostsService',
    {
      getAll: of([mockPost0, mockPost1])
    }
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        PostViewerComponentStub
      ],
      providers: [
        { provide: PostsService, useValue: postsServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('When loaded', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    afterEach(() => {
      postsServiceSpy.getAll.calls.reset();
    });

    it('Should ask for all the posts', () => {
      expect(postsServiceSpy.getAll).toHaveBeenCalledTimes(1);
    });

    it('Should display the posts', () => {
      expect(component.posts).toEqual([mockPost0, mockPost1]);
      const postViewers = debugEl.queryAll(
        By.directive(PostViewerComponentStub)
      ).map(de => de.componentInstance as PostViewerComponentStub);
      expect(postViewers.length).toBe(2);
      expect(postViewers[0].post).toEqual(mockPost0);
      expect(postViewers[1].post).toEqual(mockPost1);
    });
  });
});
