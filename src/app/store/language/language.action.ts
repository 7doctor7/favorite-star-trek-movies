import { IMovieListItem } from 'src/app/interfaces/IMovies';

export class GetLanguagesData {
  static readonly type = `[LANGUAGE] Get Language List`;
  constructor(public movieListItem: IMovieListItem) {}
}

export class GetLanguage {
  static readonly type = `[LANGUAGE] Get language`;
  constructor() {}
}

export class SetLanguage {
  static readonly type = `[LANGUAGE] Set language`;
  constructor(public language: string) {}
}
