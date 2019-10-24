import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddItemComponent } from '../add-item/add-item.component';
import { ProductService } from '../../services/api/product.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Subscription } from 'rxjs';
import { EditItemComponent } from '../edit-item/edit-item.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-items-visual',
  templateUrl: './items-visual.component.html',
  styleUrls: ['./items-visual.component.css']
})
export class ItemsVisualComponent implements OnInit {
  itemdetails :any = {};
  searchItem: string;
  is_admin:boolean=false;
  dialogRef: MatDialogRef<DeleteDialogComponent>;
  subscription : Subscription ;

  constructor(public dialog: MatDialog , private productService: ProductService,private authenticationservice:AuthenticationService) { 
    this.productService.getProducts();
    this.authenticationservice.getUserDetails().subscribe(data => {
    console.log(data)})
  }

  ngOnInit() {
    this.subscription = this
    .productService
    .productState
    .subscribe((state: any)  => {
      this.itemdetails = [];
      this.itemdetails = state;
    });

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
    const dialogRef = this.dialog.open(EditItemComponent, {
      width: '500px',
      height: '500px',
      data : e
    });
    console.log(e);
    
  }
  openDeleteDialog(e){
    console.log(e);
    
    this.dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: e,
      width: '300px',
      height: '200px',
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

  }
  cart(_product){
    this
            .productService
            .addProduct(_product);
  }
}
