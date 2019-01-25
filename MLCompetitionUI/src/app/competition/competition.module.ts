import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistryComponent } from './registry/registry.component';
import { RankingComponent } from './ranking/ranking.component';
import { CompetitionRoutingModule } from './competition-routing.module';

@NgModule({
  declarations: [
    RegistryComponent,
    RankingComponent
  ],
  imports: [
    CommonModule,
    CompetitionRoutingModule
  ]
})
export class CompetitionModule { }
