import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/api/product.service';
import { Address } from 'src/app/model/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressForm:FormGroup;
  address: any;
  newAddress:Address[] =[];
  selectedAddress:[];
  submitted: boolean =false;
  loading: boolean=false;
  error: any ='';
  selection : any ;
  header:string;
  constructor(private formBuilder: FormBuilder, 
    private router:Router,private authenticationService: AuthenticationService ,
    private product_service : ProductService) { }

  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      name: ['',Validators.required],
      contact: ['', Validators.required],
      pincode: ['', Validators.required],
      address: ['', Validators.required]
    })
    this.getDetails();
    this.header="Please select any address from below."
  }
  get f() { return this.addressForm.controls; }

  onSubmit(){
      console.log(this.addressForm.invalid);
      console.log(this.addressForm.value);
      this.submitted = true;
      if(this.addressForm.invalid){
        return;
      }
      this.loading = true;
      this.product_service.addAddress(this.addressForm.value)
      .subscribe(data => {console.log(data)
      });
      console.log(this.selection);
      this.getDetails();
    };

    getDetails(){
      this.product_service.getAddress()
      .subscribe(data => {
        this.address=data;
        this.newAddress = this.address.result[0].address_details;
        console.log(this.newAddress)
        }
      )
    }
    selectedAddess(){
      if(this.selection){
        console.log("selected");
        localStorage.setItem('address',JSON.stringify(this.selection));
        this.router.navigate(['/bankdetails']);
      }
   }

    // navigate(){
    //   this.router.navigate(['/bankdetails']); 
    // }
}
