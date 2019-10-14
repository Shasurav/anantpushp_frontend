import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material'
import { ProductService } from 'src/app/services/api/product.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private productService : ProductService) {}

  public confirmMessage:string;

  ngOnInit() {
    console.log(this.data);
    
    this.dialogRef.afterClosed().subscribe(result => {
      this.productService.deleteProduct(this.data)
    });
    // this.dialogRef.close();

  }

}
