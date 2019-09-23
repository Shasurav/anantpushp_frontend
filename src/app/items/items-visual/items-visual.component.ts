import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddItemComponent } from '../add-item/add-item.component';
import { ProductService } from '../../services/api/product.service';

@Component({
  selector: 'app-items-visual',
  templateUrl: './items-visual.component.html',
  styleUrls: ['./items-visual.component.css']
})
export class ItemsVisualComponent implements OnInit {
  itemdetails = {};
  searchItem: string;
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

}
