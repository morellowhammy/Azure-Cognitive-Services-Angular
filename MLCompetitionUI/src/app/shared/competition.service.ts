import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ICompetitor } from './competitor.model';
import { IRankingRow } from './ranking-row.model';
import { ToastrService } from 'ngx-toastr';

const config = {
  // uriBase: 'https://172.22.192.184/v1'
  // uriBase: 'https://localhost:44317/v1'
  uriBase: 'https://mlcompetition.azurewebsites.net/v1'
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

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
    ) {
    this.textHeaders = new HttpHeaders({
      'Content-Type': 'text/plain'
    });

    this.jsonHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public getCompetitorsList(): Observable<ICompetitor[]> {
    this.url = config.uriBase + '/competitors';
    const options = { headers: this.jsonHeaders };

    return this.http.get<ICompetitor[]>(this.url, options)
      .pipe(catchError(this.handleError<ICompetitor[]>('getCompetitorsList', [])));
  }

  public addCompetitor(competitor: ICompetitor): Observable<ICompetitor> {
    const options = {headers: this.jsonHeaders};
    this.url = config.uriBase + '/competitors';

    return this.http.post<ICompetitor>(this.url, competitor, options)
      .pipe(catchError(this.handleError<ICompetitor>('addCompetitor')));
  }

  public deleteCompetitor(competitorName: string): Observable<string> {
    const options = {headers: this.jsonHeaders};
    this.url = config.uriBase + '/competitors';

    return this.http.delete<string>(this.url + '/' + competitorName, options)
      .pipe(catchError(this.handleError<string>('deleteCompetitor')));
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

    return this.http.get(this.url, { responseType: 'text' })
      .pipe(catchError(this.handleError<string>('getVersion')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      if (error instanceof HttpErrorResponse) {
        if (error.status === 200) {
          this.toastr.success(error.error.text);
        } else {
          this.toastr.error(error.name + ': ' + error.message);
        }
      } else if (error.error && error.error.length > 0) {
        error.error.forEach(errorMessage => {
          this.toastr.error(errorMessage);
        });
      }
      return of(result as T);
    };
  }
}
