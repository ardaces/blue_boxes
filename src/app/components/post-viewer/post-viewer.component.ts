import { Post } from './../../core/types/post.interface';
import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-viewer',
  templateUrl: './post-viewer.component.html',
  styleUrls: ['./post-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostViewerComponent implements OnInit {

  @Input()
  post: Post | null = null;

  get title(): string | null {
    return this.post && this.post.title;
  }

  get body(): string | null {
    return this.post && this.post.body;
  }

  get displayedId(): number | null {
    let value = null;
    if (!!this.post) {
      switch (this.selectedId) {
        case 'id':
          value = this.post.id;
          break;
        case 'userId':
          value = this.post.userId;
          break;
        default:
          break;
      }
    }
    return value;
  }

  private selectedId: 'id' | 'userId' = 'id';

  @HostListener('click')
  onClick(): void {
    if (this.selectedId === 'id') {
      this.selectedId = 'userId';
    } else {
      this.selectedId = 'id';
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
