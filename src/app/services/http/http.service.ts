import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { APIResponse } from 'src/app/models/api-response';
import { Game } from 'src/app/models/game';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGameList(ordering: string, search?: string): Observable<APIResponse<Game>> {
    let params: HttpParams;
    search
      ? params = new HttpParams().set('ordering', ordering).set('search', search)
      : params = new HttpParams().set('ordering', ordering)

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params
    })
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoReq = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersReq = this.http.get(`${env.BASE_URL}/games/${id}/movies`);
    const gameScreenshotsReq = this.http.get(`${env.BASE_URL}/games/${id}/screenshots`)
    return forkJoin({
      gameInfoReq,
      gameScreenshotsReq,
      gameTrailersReq
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoReq'],
          screenshots: resp['gameScreenshotsReq']?.results,
          trailers: resp['gameTrailersReq']?.results
        };
      })
    )

  }
}
