import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const config = {
  subscriptionKey: 'ef772681ec5d48fca5cf4c83cd91a3bc',
  // tslint:disable-next-line:max-line-length
  uriBase: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/69909b15-3b8c-4e6f-b4c4-7aa8caa08639/image?iterationId=973718dd-280f-402b-9367-99c1fd8d6f9b'
};

@Injectable({
  providedIn: 'root'
})
export class HotdogVisionService {
  private url;
  private headers;

  constructor(private http: HttpClient) {
    this.url = config.uriBase;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': config.subscriptionKey
    });
  }

  public recognizeHotDog(image: any): Observable<any> {
    const options = {headers: this.headers};

    return this.http.post<any>(this.url, image, options)
      .pipe(catchError(this.handleError<any>('recognizeHotDog')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
