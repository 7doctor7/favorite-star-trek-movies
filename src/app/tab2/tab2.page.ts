import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { MoviesState } from '../store/movies/movies.state';
import { MoviesActions } from '../store/movies/movies.action';
import { UtilsService } from '../services/utils/utils.service';
import { IMovieViewModel } from '../interfaces/IMovieViewModel';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  @Select(MoviesState.favoriteMovies) favoriteMovies$: Observable<IMovieViewModel[]>;

  constructor(private store: Store, private utils: UtilsService) {}

  public async removeFromFavorites(uid: string): Promise<void> {
    this.store.dispatch(new MoviesActions.SetFavoriteMovie(uid, false));
    await this.utils.presentToast({ message: 'The movie is removed from favorites!', color: 'danger' });
  }
}
