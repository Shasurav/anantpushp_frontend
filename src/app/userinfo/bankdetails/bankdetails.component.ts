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
        this.router.navigate(['/order']);
      });
      
    }
    getDetails (){
      this.product_service.getBankDetails()
      .subscribe(data => console.log(data)
      )
    }
    // navigate(){
    //   this.router.navigate(['/order']);
    // }
}
