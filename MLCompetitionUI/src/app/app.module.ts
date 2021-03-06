import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompetitionModule } from './competition/competition.module';
import { AdminModule } from './admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { BlockUIModule } from 'ng-block-ui';
import { FaceExerciseComponent } from './home/face-exercise/face-exercise.component';
import { CustomVisionExerciseComponent } from './home/custom-vision-exercise/custom-vision-exercise.component';
import { MlstudioExerciseComponent } from './home/mlstudio-exercise/mlstudio-exercise.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FaceExerciseComponent,
    CustomVisionExerciseComponent,
    MlstudioExerciseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CompetitionModule,
    AdminModule,
    BrowserAnimationsModule,
    LayoutModule,
    SharedModule,
    ToastrModule.forRoot(),
    BlockUIModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
