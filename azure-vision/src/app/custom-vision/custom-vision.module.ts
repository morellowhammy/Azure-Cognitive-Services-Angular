import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomVisionRoutingModule } from './custom-vision-routing.module';
import { HotdogComponent } from './hotdog/hotdog.component';

@NgModule({
  declarations: [HotdogComponent],
  imports: [
    CommonModule,
    CustomVisionRoutingModule
  ]
})
export class CustomVisionModule { }
