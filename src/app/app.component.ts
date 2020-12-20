import { PostsService } from './core/services/posts/posts.service';
import { Post } from './core/types/post.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil, timeout } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line: variable-name
  private _posts: readonly Post[] = [];
  get posts(): readonly Post[] {
    return this._posts;
  }

  private $destroyed = new Subject();

  constructor(
    private readonly postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.postsService.getAll().pipe(
      timeout(10000),
      takeUntil(this.$destroyed)
    ).subscribe(
      p => this._posts = p,
      e => console.log('Whoopsie: ', e)
    );
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
    this.$destroyed.complete();
  }
}
