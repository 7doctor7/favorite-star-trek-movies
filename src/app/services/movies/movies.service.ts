import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IMovies } from '../../interfaces/IMovies';

const API_HOST = `${environment.apiHost}/api/v1`;
const MOVIES_ENDPOINT = '/rest/movie/search';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  public getMovies(): Observable<IMovies> {
    return this.http.get<IMovies>(`${API_HOST}${MOVIES_ENDPOINT}`);
  }
}
