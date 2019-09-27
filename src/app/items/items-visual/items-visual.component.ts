import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddItemComponent } from '../add-item/add-item.component';
import { ProductService } from '../../services/api/product.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-items-visual',
  templateUrl: './items-visual.component.html',
  styleUrls: ['./items-visual.component.css']
})
export class ItemsVisualComponent implements OnInit {
  itemdetails = {};
  searchItem: string;
  dialogRef: MatDialogRef<DeleteDialogComponent>;
  constructor(public dialog: MatDialog , private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((res:any) => {
          this.itemdetails = res;
          console.log(this.itemdetails);     
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '500px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  edit(e){
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '500px',
      height: '500px',
      data : e
    });
    console.log(e);
    
  }
  openDeleteDialog(e){
    this.dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: e,
      width: '300px',
      height: '200px',
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log("deleted");
      }
      this.dialogRef = null;
    });
  }
  cart(_product){
    this
            .productService
            .addProduct(_product);
  }
}
