import { FaceService } from './../../shared/face.service';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { ImageProcessorService } from 'src/app/shared/image-processor.service';
import { EmojiService } from 'src/app/shared/emoji.service';

@Component({
  selector: 'app-shoot-face',
  templateUrl: './shoot-face.component.html',
  styleUrls: ['./shoot-face.component.css']
})
export class ShootFaceComponent implements OnInit {

  private trigger: Subject<void> = new Subject<void>();

  public webcamImage: WebcamImage = null;

  public jsonResult: string = null;

  public emojiIcon;

  constructor(
    private faceService: FaceService,
    private imageProcessorService: ImageProcessorService,
    private emojiService: EmojiService) { }

  ngOnInit() {
    this.emojiIcon = this.emojiService.getDefaultEmoji();
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;

    this.imageProcessorService.imageUrltoBlob(webcamImage.imageAsDataUrl).subscribe((image) => {
      this.faceService.recognizeFace(image).subscribe((response: Array<any>) => {
        if (response.length) {
          console.log(response);
          this.jsonResult = JSON.stringify(response[0], undefined, 2);
          this.emojiIcon = this.emojiService.getEmoji(response[0].faceAttributes.emotion);
        } else {
          this.jsonResult = 'NO FACE FOUND!!';
        }
      });
    });
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
