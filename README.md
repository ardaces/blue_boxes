# BlueBoxes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.3.

## Prep

You need node.js installed - LTS version will do.
After cloning the rapository, run a `npm i` at the project directory, this might take a while to complete. Then you can proceed with the following.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Structure and mechanism

The `EventBusService` deals with well, the events dispatched by the main `AppComponent` and the `PostViewerComponent`s. `ApplicationStateService` listens to this event bus and streams parts of the application state to interested parties - namely the `AppComponent` for the 'posts' and `PostViewerComponent` for 'which id to display'.

When the application loads, `AppComponent` dispatches a `PostsRequestedEvent`, which in turn causes `ApplicationStateService` to stream fresh posts. `AppComponent` populates the grid with these posts.
When clicked, each `PostViewerComponent` dispatches a `DisplayedIdToggledEvent` with a postIndex. This causes `ApplicationStateService` to stream a new, toggled displayedId value (either 'id' or 'userId') for the `PostViewerComponent`.
