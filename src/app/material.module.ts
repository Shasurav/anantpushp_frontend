import { NgModule } from '@angular/core';
import {MatCardModule, MatInputModule, 
    MatButtonModule , MatIconModule, MatSidenavModule, 
    MatListModule,MatDividerModule,  MatDialogModule,MatGridListModule, MatCardImage, MatCardTitle,
  } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { MatFileUploadModule } from 'angular-material-fileupload';

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
  MatTableModule,
  MatDialogModule,
  MatFileUploadModule,
  MatGridListModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
