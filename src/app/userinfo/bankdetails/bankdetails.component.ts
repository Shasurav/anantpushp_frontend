import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/api/product.service';

@Component({
  selector: 'app-bankdetails',
  templateUrl: './bankdetails.component.html',
  styleUrls: ['./bankdetails.component.css']
})
export class BankdetailsComponent implements OnInit {
  bankForm:FormGroup;
  submitted: boolean =false;
  loading: boolean=false;
  error: any ='';
  bankdetails:any;
newBankdetails:[];
selection:any;
  constructor(private formBuilder: FormBuilder,
    private router:Router, private authenticationService: AuthenticationService,
    private product_service: ProductService) { }

  ngOnInit() {
    this.bankForm = this.formBuilder.group({
      name: ['',Validators.required],
      ifsc: ['', Validators.required],
      accountNo: ['', Validators.required],
      bank: ['', Validators.required]
    })
    this.getDetails();
  }
  get f() { return this.bankForm.controls; }

  onSubmit(){
      console.log(this.bankForm.invalid);
      console.log(this.bankForm.value);
      this.submitted = true;
      if(this.bankForm.invalid){
        return;
      }
      this.loading = true;
      this.product_service.addBankDetails(this.bankForm.value)
      .subscribe(data => {console.log(data);
        // this.router.navigate(['/order']);
      });
      this.getDetails();
    }
    getDetails (){
      this.product_service.getBankDetails()
      .subscribe(data => {
      this.bankdetails=data;
      this.newBankdetails = this.bankdetails.result[0].bank_details;
      console.log(this.newBankdetails)}
      )
    }
    selectedBank(){
      if(this.selection){
        console.log("selected");
        localStorage.setItem('bank',JSON.stringify(this.selection));
        this.router.navigate(['/invoice']);
      }
   }
    // navigate(){
    //   this.router.navigate(['/order']);
    // }
}
