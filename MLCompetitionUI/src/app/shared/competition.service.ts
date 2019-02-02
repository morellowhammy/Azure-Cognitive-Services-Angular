import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ICompetitor } from './competitor.model';
import { IRankingRow } from './ranking-row.model';

const config = {
  uriBase: 'https://172.22.197.20/v1'
};

const ELEMENT_DATA: IRankingRow[] = [
  {position: 1, name: 'Antuan', score: 1.0079, attempts: 3},
  {position: 2, name: 'Vinicius', score: 4.0026, attempts: 2},
  {position: 3, name: 'Leo', score: 6.941, attempts: 1},
  {position: 4, name: 'Luis', score: 9.0122, attempts: 4},
  {position: 5, name: 'Cristhian', score: 10.811, attempts: 6},
  {position: 6, name: 'Iago', score: 12.0107, attempts: 1},
  {position: 7, name: 'Ben', score: 14.0067, attempts: 1},
  {position: 8, name: 'Roger', score: 15.9994, attempts: 1},
  {position: 9, name: 'Maxi', score: 18.9984, attempts: 1},
  {position: 10, name: 'Borja', score: 20.1797, attempts: 2},
];

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private url;
  private textHeaders;
  private jsonHeaders;

  constructor(private http: HttpClient) {
    this.textHeaders = new HttpHeaders({
      'Content-Type': 'text/plain'
    });

    this.jsonHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public addCompetitor(competitor: ICompetitor): Observable<ICompetitor> {
    const options = {headers: this.jsonHeaders};
    this.url = config.uriBase + '/competitors';

    return this.http.post<ICompetitor>(this.url, competitor, options)
      .pipe(catchError(this.handleError<ICompetitor>('addCompetitor')));
  }

  public getRankingsList(): Observable<IRankingRow[]> {
    this.url = config.uriBase + '/ranking';
    const options = { headers: this.jsonHeaders };

    // return of(ELEMENT_DATA as IRankingRow[]);
    return this.http.get<IRankingRow[]>(this.url, options)
      .pipe(catchError(this.handleError<IRankingRow[]>('getRankingsList', [])));
  }

  public getVersion(): Observable<string> {
    this.url = config.uriBase + '/version';
    const options = {
      headers: this.textHeaders,
      responseType: 'text'
    };

    return this.http.get<string>(this.url, options)
      .pipe(catchError(this.handleError<string>('getConnectors')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
