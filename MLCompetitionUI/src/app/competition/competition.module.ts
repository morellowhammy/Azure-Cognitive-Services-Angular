import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistryComponent } from './registry/registry.component';
import { RankingComponent } from './ranking/ranking.component';
import { CompetitionRoutingModule } from './competition-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RegistryComponent,
    RankingComponent
  ],
  imports: [
    CommonModule,
    CompetitionRoutingModule,
    SharedModule
  ]
})
export class CompetitionModule { }
