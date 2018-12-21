import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomVisionRoutingModule } from './custom-vision-routing.module';
import { HotdogComponent } from './hotdog/hotdog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HotdogComponent],
  imports: [
    CommonModule,
    CustomVisionRoutingModule,
    SharedModule
  ]
})
export class CustomVisionModule { }
