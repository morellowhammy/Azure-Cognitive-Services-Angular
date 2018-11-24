import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShootFaceComponent } from './shoot-face/shoot-face.component';

const routes: Routes = [
  {
    path: 'face',
    component: ShootFaceComponent,
    children: [
      { path: '', component: ShootFaceComponent },
      { path: 'shoot-face', component: ShootFaceComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaceRoutingModule { }
