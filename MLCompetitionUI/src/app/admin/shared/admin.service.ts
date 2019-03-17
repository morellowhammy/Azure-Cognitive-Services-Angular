import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public competitionServiceUrl: string;

  private url;
  private textHeaders;
  private jsonHeaders;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
    ) {
    this.competitionServiceUrl = environment.competitionServiceUrl;
    this.textHeaders = new HttpHeaders({
      'Content-Type': 'text/plain'
    });

    this.jsonHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public getCompetitionEnable(): Observable<string> {
    this.url = this.competitionServiceUrl + '/admin/competition-enable/';

    return this.http.get(this.url, { responseType: 'text' })
      .pipe(catchError(this.handleError<string>('getCompetitionEnable')));
  }

  public setCompetitionEnable(enable: boolean): Observable<boolean> {
    const options = {headers: this.jsonHeaders};
    this.url = this.competitionServiceUrl + '/admin/competition-enable/';

    return this.http.post<boolean>(this.url, enable, options)
      .pipe(catchError(this.handleError<boolean>('setCompetitionEnable')));
  }

  public getNumberOfScoringTests(): Observable<string> {
    this.url = this.competitionServiceUrl + '/admin/num-scoring-tests/';

    return this.http.get(this.url, { responseType: 'text' })
      .pipe(catchError(this.handleError<string>('getNumberOfScoringTests')));
  }

  public setNumberOfScoringTests(numScoringTests: number): Observable<number> {
    const options = {headers: this.jsonHeaders};
    this.url = this.competitionServiceUrl + '/admin/num-scoring-tests/';

    return this.http.post<number>(this.url, numScoringTests, options)
      .pipe(catchError(this.handleError<number>('getNumberOfScoringTests')));
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
