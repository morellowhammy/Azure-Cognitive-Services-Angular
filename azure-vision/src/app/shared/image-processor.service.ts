import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessorService {

  constructor() { }

  public imageUrltoBlob(imageAsDataUrl): Observable<Blob> {
    const block = imageAsDataUrl.split(';');
    const contentType = block[0].split(':')[1];
    const realData = block[1].split(',')[1];

    return this.b64toBlob(realData, contentType);
  }

  public b64toBlob(b64Data, contentType = '', sliceSize = 1024): Observable<Blob> {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return of(new Blob(byteArrays, {type: contentType}));
  }
}
