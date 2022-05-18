interface IMainDirector {
  uid: string;
  name: string;
}


interface IPage {
  firstPage: boolean;
  lastPage: boolean;
  numberOfElements: number;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface IMovieListItem {
  mainDirector: IMainDirector;
  stardateFrom: number;
  stardateTo: number;
  title: string;
  titleBulgarian: string | null;
  titleCatalan: string | null;
  titleChineseTraditional: string | null;
  titleGerman: string | null;
  titleItalian: string | null;
  titleJapanese: string | null;
  titlePolish: string | null;
  titleRussian: string | null;
  titleSerbian: string | null;
  titleSpanish: string | null;
  uid: string;
  usReleaseDate: string;
  yearFrom: number;
  yearTo: number;
}

export interface IMovies {
  movies: IMovieListItem[];
  page?: IPage;
  sort?: { clauses: unknown[] };
}
