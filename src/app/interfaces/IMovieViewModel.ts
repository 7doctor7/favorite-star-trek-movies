import { IMovieListItem } from './IMovies';

export interface IMovieViewModel extends IMovieListItem {
  fromTo: string;
  isInFavorites: boolean;
  releaseDate: string;
  releaseDateObj: Date | null;
  localizedName: string;
  currentLanguage: string;
}
