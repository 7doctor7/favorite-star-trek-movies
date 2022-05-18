import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

import { MoviesActions } from './store/movies/movies.action';
import { IMovieState } from './interfaces/IMovieState';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store) {
    this.initializeApp();
  }

  initializeApp(): void {
    const snapshot: IMovieState = this.store.selectSnapshot(state => state.MoviesState);

    if (!snapshot.movies.length) {
      this.store.dispatch(new MoviesActions.GetMoviesData());
    }
  }
}
