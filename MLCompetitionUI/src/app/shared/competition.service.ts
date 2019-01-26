import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const config = {
  uriBase: 'https://172.22.195.238/v1'
};

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private url;
  private headers;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  public addCompetitor(competitor: any): Observable<any> {
    const options = {headers: this.headers};
    this.url = config.uriBase + '/competitors';

    return this.http.post<any>(this.url, competitor, options)
      .pipe(catchError(this.handleError<any>('addCompetitor')));
  }

  public getRankingsList(): Observable<any[]> {
    this.url = config.uriBase + '/ranking';

    return this.http.get<any[]>(this.url)
      .pipe(catchError(this.handleError<any[]>('getRankingsList', [])));

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
