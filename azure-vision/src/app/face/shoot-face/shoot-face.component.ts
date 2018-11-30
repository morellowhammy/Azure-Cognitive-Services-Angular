import { FaceService } from './../../shared/face.service';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-shoot-face',
  templateUrl: './shoot-face.component.html',
  styleUrls: ['./shoot-face.component.css']
})
export class ShootFaceComponent implements OnInit {

  private trigger: Subject<void> = new Subject<void>();

  // latest snapshot
  public webcamImage: WebcamImage = null;

  constructor(private faceService: FaceService) { }

  ngOnInit() {
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    const image = new Image();
    image.src = webcamImage.imageAsBase64;
    this.faceService.recognizeFace(image).subscribe((response) => {
      console.log(response);
    });
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

}
