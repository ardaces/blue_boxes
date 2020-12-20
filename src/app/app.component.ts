import { EventBus } from './core/services/event-bus/event-bus.service';
import { ApplicationState } from './core/services/state/application-state.service';
import { Post } from './core/types/post.interface';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsRequestedEvent } from './core/services/state/events/posts-requested-event.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  readonly posts$: Observable<readonly Post[]>;

  constructor(
    private readonly appState: ApplicationState,
    private readonly events: EventBus
  ) {
    this.posts$ = this.appState.selectPosts();
  }

  ngOnInit(): void {
    this.events.dispatch(new PostsRequestedEvent());
  }
}
