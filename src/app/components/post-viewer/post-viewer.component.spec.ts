import { Post } from './../../core/types/post.interface';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewerComponent } from './post-viewer.component';
import { runOnPushChangeDetection } from 'src/app/testing/run-onpush-change-detection.function';

describe('PostViewerComponent', () => {
  let component: PostViewerComponent;
  let fixture: ComponentFixture<PostViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostViewerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When given a post', () => {
    const mockPost0 = { id: 1, userId: 2, title: 'testTitle0', body: 'testBody0' } as Post;
    it('Should make available post title, post body', () => {
      component.post = mockPost0;
      runOnPushChangeDetection(fixture);
      expect(component.title).toBe(mockPost0.title);
      expect(component.body).toBe(mockPost0.body);
      expect(component.displayedId).toBe(mockPost0.id);
    });
    it('Should initially make available post \'id\' as displayed id', () => {
      component.post = mockPost0;
      runOnPushChangeDetection(fixture);
      expect(component.displayedId).toBe(mockPost0.id);
    });

    describe('When clicked successively', () => {
      it('Should make available post \'userId\', and then post \'id\' and so on as displayed id', () => {
        component.post = mockPost0;
        runOnPushChangeDetection(fixture);
        fixture.debugElement.triggerEventHandler('click', null);
        runOnPushChangeDetection(fixture);
        expect(component.displayedId).toBe(mockPost0.userId);
        fixture.debugElement.triggerEventHandler('click', null);
        runOnPushChangeDetection(fixture);
        expect(component.displayedId).toBe(mockPost0.id);
      });
    });
  });
});
