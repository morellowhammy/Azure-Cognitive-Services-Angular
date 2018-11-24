import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaceRoutingModule } from './face-routing.module';
import { ShootFaceComponent } from './shoot-face/shoot-face.component';
import { CamaraComponent } from './camara/camara.component';

@NgModule({
  declarations: [ShootFaceComponent, CamaraComponent],
  imports: [
    CommonModule,
    FaceRoutingModule
  ]
})
export class FaceModule { }
