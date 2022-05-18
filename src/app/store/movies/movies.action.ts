export namespace MoviesActions {
  export class GetMoviesData {
    static readonly type = `[MOVIES] Get Movies Data`;
  }

  export class GetFavoriteMovies {
    static readonly type = `[MOVIES] Get Favorite Movies`;
  }

  export class SetFavoriteMovie {
    static readonly type = `[MOVIES] Set Favorite Movies`;
    constructor(public uid: string, public isInFavorites: boolean) {}
  }

  export class SetLanguage {
    static readonly type = `[MOVIES] Set Language`;
    constructor(public language: string) {}
  }
}
