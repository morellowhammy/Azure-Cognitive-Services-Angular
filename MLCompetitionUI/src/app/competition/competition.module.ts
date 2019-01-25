import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryComponent } from './registry/registry.component';
import { RankingComponent } from './ranking/ranking.component';

@NgModule({
  declarations: [RegistryComponent, RankingComponent],
  imports: [
    CommonModule
  ]
})
export class CompetitionModule { }
