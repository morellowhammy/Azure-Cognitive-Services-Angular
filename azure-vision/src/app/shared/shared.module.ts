import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
    WebcamModule
  ],
  exports: [
    MaterialModule,
    WebcamModule
  ]
})
export class SharedModule { }
