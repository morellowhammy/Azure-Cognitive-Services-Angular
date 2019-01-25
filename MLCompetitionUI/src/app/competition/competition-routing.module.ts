import { RankingComponent } from './ranking/ranking.component';
import { RegistryComponent } from './registry/registry.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'competition',
    component: RegistryComponent,
    children: [
      { path: '', component: RegistryComponent },
      { path: 'registry', component: RegistryComponent },
      { path: 'ranking', component: RankingComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetitionRoutingModule { }
