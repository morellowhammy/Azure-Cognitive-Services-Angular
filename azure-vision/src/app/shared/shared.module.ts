import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    WebcamModule
  ],
  exports: [
    WebcamModule
  ]
})
export class SharedModule { }
