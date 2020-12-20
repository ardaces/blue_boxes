import { DisplayedId } from './types/displayed-id.type';
import { DisplayedIdToggledEvent } from './events/displayed-id-toggled-event.class';
import { Post } from './../../types/post.interface';
import { PostsService } from '../posts/posts.service';
import { PostViewerConfiguration } from './types/post-viewer-configuration.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventBus } from '../event-bus/event-bus.service';
import { PostsRequestedEvent } from './events/posts-requested-event.class';
import { filter, map, shareReplay, switchMapTo } from 'rxjs/operators';

@Injectable()
export class ApplicationState {

  private readonly $posts = new BehaviorSubject<readonly Post[]>([]);
  private readonly posts$ = this.$posts.pipe(shareReplay(1));

  constructor(
    private readonly eventBus: EventBus,
    private readonly posts: PostsService
  ) {
    this.eventBus.events$.pipe(
      filter(event => event instanceof PostsRequestedEvent),
      switchMapTo(this.posts.getAll())
    ).subscribe(
      freshPosts => this.handleFreshPosts(freshPosts)
    );

    this.eventBus.events$.pipe(
      filter(event => {
        return (
          event instanceof DisplayedIdToggledEvent &&
          (event as unknown as DisplayedIdToggledEvent).postIndex !== null
        );
      }),
      map(event => (event as unknown as DisplayedIdToggledEvent).postIndex as number)
    ).subscribe(
      pIx => this.handleDisplayedIdToggle(pIx)
    );

    this.posts$.subscribe(
      freshPosts => this.rebuildPostViewerConfig$s(freshPosts)
    );
  }

  selectPosts(): Observable<readonly Post[]> {
    return this.posts$;
  }

  selectWhichIdToDisplay(postIndex: number): Observable<DisplayedId | null> {
    return this.postViewerConfig$s[postIndex].pipe(
      map(cfg => cfg.displayedId)
    );
  }

  private handleDisplayedIdToggle(postIndex: number): void {
    const $currConfig = this.$postViewerConfigs[postIndex];
    if (!!$currConfig) {
      let nextConfig: PostViewerConfiguration = { displayedId: 'id' };
      if ($currConfig.value.displayedId === 'id') {
        nextConfig = { displayedId: 'userId' };
      }
      $currConfig.next(nextConfig);
    }
  }

  private handleFreshPosts(freshPosts: readonly Post[]): void {
    this.rebuildPostViewerConfig$s(freshPosts);
    this.$posts.next(freshPosts);
  }

  // tslint:disable: member-ordering
  private $postViewerConfigs: { [key: number]: BehaviorSubject<PostViewerConfiguration> } = {};
  private postViewerConfig$s: { [key: number]: Observable<PostViewerConfiguration> } = {};
  // tslint:enable: member-ordering
  private rebuildPostViewerConfig$s(freshPosts: readonly Post[]): void {
    this.clearPreviousPostViewerConfig$s();

    freshPosts.forEach((_, index) => {
      this.$postViewerConfigs[index] = new BehaviorSubject<PostViewerConfiguration>({ displayedId: 'id' });
      this.postViewerConfig$s[index] = this.$postViewerConfigs[index].pipe(
        shareReplay(1)
      );
    });
  }
  private clearPreviousPostViewerConfig$s(): void {
    // tslint:disable-next-line: forin
    for (const index in this.$postViewerConfigs) {
      if (this.$postViewerConfigs.hasOwnProperty(index)) {
        delete this.$postViewerConfigs[index];
      }
      if (this.postViewerConfig$s.hasOwnProperty(index)) {
        delete this.postViewerConfig$s[index];
      }
    }
  }
}
