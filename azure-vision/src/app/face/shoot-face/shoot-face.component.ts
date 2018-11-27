import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
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

  constructor() { }

  ngOnInit() {
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

}
