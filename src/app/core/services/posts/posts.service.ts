import { Post } from '../../types/post.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PostsService {

  constructor(
    private readonly client: HttpClient
  ) { }

  getAll(): Observable<readonly Post[]> {
    return this.client.get<Post[]>(
      'https://jsonplaceholder.typicode.com/posts',
      { observe: 'body', responseType: 'json' }
    );
  }
}
