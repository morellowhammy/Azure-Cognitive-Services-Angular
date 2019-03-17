import { Prediction } from './../shared/prediction.model';
import { HotdogVisionService } from './../shared/hotdog-vision.service';
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

  public fileImage = null;

  public jsonResult: string = null;

  public predictionResult: string = null;

  constructor(
    private hotdogVisionService: HotdogVisionService,
    private imageProcessorService: ImageProcessorService) { }

  ngOnInit() {
  }

  public triggerSnapshot(): void {
    this.reset();
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;

    this.imageProcessorService.imageUrltoBlob(webcamImage.imageAsDataUrl).subscribe((image) => {
      this.hotdogVisionService.recognizeHotDog(image).subscribe((response: any) => {
        this.AnalyzeHotDogPrediction(response);
      });
    });
  }

  private AnalyzeHotDogPrediction(response: any) {
    if (response.predictions) {
      console.log(response);
      this.jsonResult = JSON.stringify(response, undefined, 2);
      const hotdogPrediction = response.predictions.find(x => x.tagName === 'hotdog') as Prediction;
      if (hotdogPrediction.probability > 0.9) {
        this.predictionResult = 'IT IS A HOT DOG!!';
      } else {
        this.predictionResult = 'IT IS NOT A HOT DOG!!';
      }
    } else {
      this.jsonResult = 'NO DATA FROM AZURE!!';
    }
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public uploadImage(event) {
    const reader  = new FileReader();

    reader.onload = () => {
      this.fileImage = reader.result;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };

    const image = event.target.files[0];
    if (image) {
      reader.readAsDataURL(image);
      this.hotdogVisionService.recognizeHotDog(image).subscribe((response: any) => {
        this.AnalyzeHotDogPrediction(response);
      });
    } else {
      this.fileImage = null;
    }

    console.log('uploading image');
  }

  public reset() {
    this.fileImage = null;
    this.webcamImage = null;
    this.jsonResult = null;
    const form = document.getElementById('fileForm') as any;
    form.reset();
  }
}
