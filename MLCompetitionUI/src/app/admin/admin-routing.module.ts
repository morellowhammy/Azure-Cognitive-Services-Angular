import { CompetitorsListComponent } from './competitors-list/competitors-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    component: CompetitorsListComponent,
    children: [
      { path: '', component: CompetitorsListComponent },
      { path: 'competitors-list', component: CompetitorsListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
