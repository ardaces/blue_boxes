import { DisplayedIdToggledEvent } from './../../core/services/state/events/displayed-id-toggled-event.class';
import { EventBus } from './../../core/services/event-bus/event-bus.service';
import { ApplicationState } from './../../core/services/state/application-state.service';
import { Post } from './../../core/types/post.interface';
import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-post-viewer',
  templateUrl: './post-viewer.component.html',
  styleUrls: ['./post-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostViewerComponent implements OnInit {
  @Input()
  set post(value: Post) {
    this.$post.next(value);
  }

  @Input()
  set postIndex(value: number | null) {
    this.$postIndex.next(value);
  }

  get postIndex(): number | null {
    return this.$postIndex.value;
  }

  private readonly $post = new BehaviorSubject<Post | null>(null);
  private readonly $postIndex = new BehaviorSubject<number | null>(null);
  readonly displayedId$: Observable<number | null>;
  readonly postTitle$: Observable<string | null>;
  readonly postBody$: Observable<string | null>;

  @HostListener('click')
  onClick(): void {
    this.events.dispatch(new DisplayedIdToggledEvent(this.postIndex));
  }

  constructor(
    private readonly appState: ApplicationState,
    private readonly events: EventBus
  ) {

    this.displayedId$ = combineLatest([
      this.$postIndex.pipe(
        filter(pIx => pIx !== null),
        map(pIx => pIx as number),
        switchMap(
          pIx => this.appState.selectWhichIdToDisplay(pIx)
        )
      ),
      this.$post
    ]).pipe(
      map(([whichIdToDisplay, post]) => {
        if (!post) {
          return null;
        }
        if (!whichIdToDisplay) {
          return post.id;
        } else {
          return post[whichIdToDisplay];
        }
      }),
      shareReplay(1)
    );

    this.postTitle$ = this.$post.pipe(
      map(p => p && p.title),
      shareReplay(1)
    );
    this.postBody$ = this.$post.pipe(
      map(p => p && p.body),
      shareReplay(1)
    );
  }

  ngOnInit(): void {
  }

}
