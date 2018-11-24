import { HotdogComponent } from './hotdog/hotdog.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'custom-vision',
    component: HotdogComponent,
    children: [
      { path: '', component: HotdogComponent },
      { path: 'hotdog', component: HotdogComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomVisionRoutingModule { }
