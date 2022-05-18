import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { ILanguageState } from 'src/app/interfaces/ILanguageState';
import { MoviesActions } from '../movies/movies.action';
import { GetLanguage, SetLanguage, GetLanguagesData } from './language.action';

@State<ILanguageState>({
  name: 'LanguageState',
  defaults: {
    currentLanguage: 'English',
    languageList: [],
  },
})
@Injectable()
export class LanguageState {
  constructor(private store: Store) {}

  @Selector()
  public static currentLanguge(state: ILanguageState): string {
    return state.currentLanguage;
  }

  @Selector()
  public static langugeData(state: ILanguageState): ILanguageState {
    return state;
  }

  @Action(GetLanguage)
  public getLanguage({ getState }: StateContext<ILanguageState>): string {
    const state = getState();
    return state.currentLanguage;
  }

  @Action(SetLanguage)
  public setLanguage({ patchState, getState }: StateContext<ILanguageState>, { language }: SetLanguage) {
    const state = getState();

    patchState({
      ...state,
      currentLanguage: language,
    });

    this.store.dispatch(new MoviesActions.SetLanguage(language));
  }

  @Action(GetLanguagesData)
  public getLanguagesData({ patchState, getState }: StateContext<ILanguageState>, { movieListItem }: GetLanguagesData) {
    const state = getState();
    const keys = Object.keys(movieListItem);
    const languageList: string[] = keys
      // Create Array with keys strings that contains a title in key name;
      .filter(key => key.includes('title'))
      // Create Array with language substrings from keys. If empty - set as English;
      .map(key => (key.split('title')[1].length ? key.split('title')[1] : 'English'))
      // Remove duplicates if exists;
      .filter((language, index, list) => list.indexOf(language) === index);

    patchState({
      ...state,
      languageList,
    });
  }
}
