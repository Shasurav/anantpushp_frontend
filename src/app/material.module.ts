import { NgModule } from '@angular/core';
import {MatCardModule, MatInputModule, 
    MatButtonModule , MatIconModule, MatSidenavModule, 
    MatListModule,MatDividerModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
