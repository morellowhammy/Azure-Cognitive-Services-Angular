import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetitorsListComponent } from './competitors-list/competitors-list.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [CompetitorsListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
