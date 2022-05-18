import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { MoviesState } from '../store/movies/movies.state';
import { MoviesActions } from '../store/movies/movies.action';
import { UtilsService } from '../services/utils/utils.service';
import { IMovieViewModel } from '../interfaces/IMovieViewModel';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  @Select(MoviesState.movieList) movieList$: Observable<IMovieViewModel[]>;

  constructor(private store: Store, private utils: UtilsService) {}

  public async setMovieAsFavorite(uid: string): Promise<void> {
    this.store.dispatch(new MoviesActions.SetFavoriteMovie(uid, true));
    await this.utils.presentToast({ message: 'The movie is set as favorite!' });
  }
}
