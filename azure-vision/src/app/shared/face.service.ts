import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const config = {
  subscriptionKey: 'd62b05bb31264373b6bad497eddd6f7e',
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

  constructor(private http: HttpClient) { }

  public recognizeFace(image: any): Observable<any> {
    const url = config.uriBase + '/detect?returnFaceAttributes=' + config.params.returnFaceAttributes;

    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': config.subscriptionKey
    });
    const options = {headers: headers};

    return this.http.post<any>(url, image, options)
      .pipe(catchError(this.handleError<any>('saveEvent')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
