import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material'
import {  MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/api/product.service';
import { FormGroup  , FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {


  editItem: FormGroup;
  item_id: string;
  price: number;
  url = "" ;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<any> ,
              private productService : ProductService, private formBuilder : FormBuilder
  ) { }

  ngOnInit() {
    this.editItem  = this.formBuilder.group({
      name: [''],
      price: [''],
      item_id: ['']
    });
    console.log(this.data , "dialoge");
    // this.addItem.get('photo').setValue(this.data.Image)
    this.editItem.get('name').setValue(this.data.name)
    this.url = this.data.image;
    this.editItem.get('price').setValue(this.data.price)
    this.editItem.get('item_id').setValue(this.data.item_id)
  }

  edit(){
    console.log( this.editItem.get('item_id').value,this.editItem.get('price').value);
    
    var product = {
      price : this.editItem.get('price').value,
      item_id : this.editItem.get('item_id').value
    }

    this.productService.editProduct(product);
    this.dialogRef.close();

  }
}
