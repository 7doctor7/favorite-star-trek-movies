import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MoviesService } from 'src/app/services/movies/movies.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { IMovieListItem } from 'src/app/interfaces/IMovies';
import { IMovieViewModel } from 'src/app/interfaces/IMovieViewModel';
import { MoviesActions } from './movies.action';
import { IMovieState } from 'src/app/interfaces/IMovieState';
import { LanguageState } from '../language/language.state';
import { GetLanguagesData } from '../language/language.action';

@State<IMovieState>({
  name: 'MoviesState',
  defaults: {
    movies: [],
  },
})
@Injectable()
export class MoviesState {
  constructor(private service: MoviesService, private store: Store, private utils: UtilsService) {}

  @Selector()
  public static movieList(state: IMovieState): IMovieViewModel[] {
    return state.movies.filter(movie => !movie.isInFavorites);
  }

  @Selector()
  public static favoriteMovies(state: IMovieState): IMovieViewModel[] {
    return state.movies.filter(movie => movie.isInFavorites);
  }

  @Action(MoviesActions.SetFavoriteMovie)
  public setFavoriteMovie(context: StateContext<IMovieState>, { uid, isInFavorites }: MoviesActions.SetFavoriteMovie) {
    context.setState(
      patch({
        movies: updateItem((movie: IMovieViewModel) => movie.uid === uid, patch({ isInFavorites })),
      })
    );
  }

  @Action(MoviesActions.SetLanguage)
  public setLanguage(context: StateContext<IMovieState>, { language }: MoviesActions.SetLanguage) {
    const state = context.getState();
    const movies = state.movies.map(movie => ({
      ...movie,
      localizedName: this.getLocalizedName(movie, language),
      currentLanguage: language,
    }));

    context.setState(
      patch({
        movies,
      })
    );
  }

  @Action(MoviesActions.GetMoviesData)
  public getMoviesData(context: StateContext<IMovieState>) {
    return this.service.getMovies().pipe(
      tap(response => {
        const state = context.getState();
        const currentLanguge = this.store.selectSnapshot(LanguageState.currentLanguge);
        const movies = response.movies
          .map(movie => this.createMovieViewModel(movie, currentLanguge))
          .sort((movieA, movieB) => movieA.releaseDateObj.getTime() - movieB.releaseDateObj.getTime());

        if (movies.length) {
          this.store.dispatch(new GetLanguagesData(response.movies[0]));
        }

        context.patchState({
          ...state,
          movies,
        });
      }),
      catchError(() => of([]))
    );
  }

  private createMovieViewModel(movie: IMovieListItem, currentLanguage: string): IMovieViewModel {
    return {
      ...movie,
      currentLanguage,
      fromTo: movie.yearFrom && movie.yearTo ? `${movie.yearFrom}-${movie.yearTo}` : '-',
      releaseDate: movie.usReleaseDate,
      releaseDateObj: new Date(movie.usReleaseDate),
      isInFavorites: false,
      localizedName: this.getLocalizedName(movie, currentLanguage),
    };
  }

  private getLocalizedName(movie: IMovieListItem, currentLanguage: string): string {
    const keys = Object.keys(movie);
    const localizedKey = keys.find(key => key.includes(currentLanguage)) || 'title';
    return movie[localizedKey];
  }
}
