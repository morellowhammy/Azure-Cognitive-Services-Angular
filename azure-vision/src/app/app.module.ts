import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FaceModule } from './face/face.module';
import { CustomVisionModule } from './custom-vision/custom-vision.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FaceModule,
    CustomVisionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
