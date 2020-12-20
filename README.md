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

Not much here but the main `AppComponent` and the `PostViewerComponent`.

When the application loads, `AppComponent` fetches posts via the `PostsService` and populates the grid with a `PostViewerComponent` for each of these posts.
When clicked, each `PostViewerComponent` toggles the value displayed for the 'id' (either 'id' or 'userId').
