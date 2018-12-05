import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const config = {
  subscriptionKey: '7e6424ae04c8448d8be6bdbf14034ea3',
  params: {
      'returnFaceId': 'true',
      'returnFaceLandmarks': 'false',
      'returnFaceAttributes':
          'age,gender,headPose,smile,facialHair,glasses,emotion,' +
          'hair,makeup,occlusion,accessories'
  },
  uriBase: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0'
};

@Injectable({
  providedIn: 'root'
})
export class FaceService {
  private url;
  private headers;

  constructor(private http: HttpClient) {
    this.url = config.uriBase + '/detect?returnFaceAttributes=' + config.params.returnFaceAttributes;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': config.subscriptionKey
    });
  }

  public recognizeFace(image: any): Observable<any> {
    const options = {headers: this.headers};

    return this.http.post<any>(this.url, image, options)
      .pipe(catchError(this.handleError<any>('recognizeFace')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
