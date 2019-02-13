import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

const config = {
  // uriBase: 'https://172.22.192.184/v1'
  uriBase: 'https://localhost:44317/v1'
  // uriBase: 'https://mlcompetition.azurewebsites.net/v1'
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

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

  public getCompetitionEnable(): Observable<string> {
    this.url = config.uriBase + '/admin/competition-enable/';

    return this.http.get(this.url, { responseType: 'text' })
      .pipe(catchError(this.handleError<string>('getCompetitionEnable')));
  }

  public setCompetitionEnable(enable: boolean): Observable<boolean> {
    const options = {headers: this.jsonHeaders};
    this.url = config.uriBase + '/admin/competition-enable/';

    return this.http.post<boolean>(this.url, enable, options)
      .pipe(catchError(this.handleError<boolean>('setCompetitionEnable')));
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
