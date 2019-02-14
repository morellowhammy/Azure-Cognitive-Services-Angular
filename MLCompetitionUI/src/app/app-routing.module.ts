import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaceExerciseComponent } from './home/face-exercise/face-exercise.component';
import { CustomVisionExerciseComponent } from './home/custom-vision-exercise/custom-vision-exercise.component';
import { MlstudioExerciseComponent } from './home/mlstudio-exercise/mlstudio-exercise.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'home/face-exercise', component: FaceExerciseComponent },
      { path: 'home/custom-vision-exercise', component: CustomVisionExerciseComponent },
      { path: 'home/mlstudio-exercise', component: MlstudioExerciseComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
