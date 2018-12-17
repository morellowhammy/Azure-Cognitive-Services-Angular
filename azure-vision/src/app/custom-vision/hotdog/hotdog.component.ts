import { HotdogVisionService } from './../shared/hotdog-vision.service';
import { FaceService } from './../../shared/face.service';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { ImageProcessorService } from 'src/app/shared/image-processor.service';

@Component({
  selector: 'app-hotdog',
  templateUrl: './hotdog.component.html',
  styleUrls: ['./hotdog.component.css']
})
export class HotdogComponent implements OnInit {

  private trigger: Subject<void> = new Subject<void>();

  public webcamImage: WebcamImage = null;

  public jsonResult: string = null;

  constructor(
    private hotdogVisionService: HotdogVisionService,
    private imageProcessorService: ImageProcessorService) { }

  ngOnInit() {
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;

    this.imageProcessorService.imageUrltoBlob(webcamImage.imageAsDataUrl).subscribe((image) => {
      this.hotdogVisionService.recognizeHotDog(image).subscribe((response: Array<any>) => {
        if (response) {
          console.log(response);
          this.jsonResult = JSON.stringify(response, undefined, 2);
        } else {
          this.jsonResult = 'NO HOT DOG!!';
        }
      });
    });
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
