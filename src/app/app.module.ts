import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { PostViewerComponent } from './components/post-viewer/post-viewer.component';

import { PostsService } from './core/services/posts/posts.service';
import { ApplicationState } from './core/services/state/application-state.service';
import { EventBus } from './core/services/event-bus/event-bus.service';

@NgModule({
  declarations: [
    AppComponent,
    PostViewerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    PostsService,
    ApplicationState,
    EventBus
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
