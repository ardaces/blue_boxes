import { Post } from '../../types/post.interface';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PostsService } from './posts.service';

describe('PostsService', () => {
  let posts: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PostsService
      ]
    });
    posts = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(posts).toBeTruthy();
  });

  describe('When it\'s getAll() method is called', () => {
    const mockPost0 = { id: 1, userId: 2, title: 'testTitle0', body: 'testBody0' } as Post;
    const mockPost1 = { id: 2, userId: 3, title: 'testTitle1', body: 'testBody1' } as Post;

    it('Should retrieve posts via a get request to https://jsonplaceholder.typicode.com/posts', () => {
      posts.getAll().subscribe(
        p => expect(p).toEqual([mockPost0, mockPost1])
      );

      const mockRequest = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
      mockRequest.flush([mockPost0, mockPost1]);

      httpMock.verify();
    });
  });
});
