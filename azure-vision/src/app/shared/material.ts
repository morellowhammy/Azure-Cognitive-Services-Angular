import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
} from '@angular/material';
import { NgModule } from '@angular/core';

const modules = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule { }
