import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ILanguageState } from '../interfaces/ILanguageState';
import { UtilsService } from '../services/utils/utils.service';
import { SetLanguage } from '../store/language/language.action';
import { LanguageState } from '../store/language/language.state';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @Select(LanguageState.langugeData) languageData$: Observable<ILanguageState>;

  constructor(private store: Store, private utils: UtilsService) {}

  public async changeLanguage(language: string): Promise<void> {
    this.store.dispatch(new SetLanguage(language));
    await this.utils.presentToast({ message: 'Language changed successfully!' });
  }

}
