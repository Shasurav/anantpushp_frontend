import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ProductService } from '../../services/api/product.service';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  files;
  url: any = '' ;
  addItem: FormGroup;
  name: string;
  price: number;
  image: string;
  stock: number;
  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddItemComponent>,
              private productService: ProductService) { this.files = []; }

  ngOnInit() {
    this.addItem  = this.formBuilder.group({
      item_name: ['', [Validators.required]],
      price: ['', Validators.required],
      photo: [''],
      stock: ['', Validators.required]
    });
  }
    onFileChanged(event) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        this.files = event.target.files[0];
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e) => {
          this.url = reader.result;
        };
        this.addItem.get('photo').setValue(this.files);

      }
    }
  onUpload() {
    const formData = new FormData();
    formData.append('photo', this.addItem.get('photo').value);
    formData.append('item_name', this.addItem.get('item_name').value);
    formData.append('price', this.addItem.get('price').value);
    formData.append('stock', this.addItem.get('stock').value);

    this.productService.create(formData).subscribe(x => {
      console.log(x);
    });
    this.dialogRef.close();
  }
}
