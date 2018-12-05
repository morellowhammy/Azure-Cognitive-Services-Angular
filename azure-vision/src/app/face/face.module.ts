import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaceRoutingModule } from './face-routing.module';
import { ShootFaceComponent } from './shoot-face/shoot-face.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ShootFaceComponent
  ],
  imports: [
    CommonModule,
    FaceRoutingModule,
    SharedModule
  ]
})
export class FaceModule { }
