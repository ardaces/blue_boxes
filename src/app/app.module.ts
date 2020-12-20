import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsService } from './core/services/posts/posts.service';
import { CommonModule } from '@angular/common';
import { PostViewerComponent } from './components/post-viewer/post-viewer.component';

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
    PostsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
