import { Component } from '@angular/core';
import { ProductService } from './services/api/product.service';
import { LoaderService } from './services/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLoadingIndicator = true;
    constructor(private productService: ProductService, public loaderService: LoaderService,) {
      this.productService.allCartList();
    }


}
