import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
} from '@angular/material';
import { NgModule } from '@angular/core';

const modules = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule { }
