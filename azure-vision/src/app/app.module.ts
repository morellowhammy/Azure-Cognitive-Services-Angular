import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FaceModule } from './face/face.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FaceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
