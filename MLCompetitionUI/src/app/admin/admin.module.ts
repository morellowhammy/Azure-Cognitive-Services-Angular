import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetitorsListComponent } from './competitors-list/competitors-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CompetitorsListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
