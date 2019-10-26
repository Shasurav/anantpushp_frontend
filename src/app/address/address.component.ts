import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressForm:FormGroup;
  submitted: boolean =false;
  loading: boolean=false;
  error: any ='';

  constructor(private formBuilder: FormBuilder, private router:Router,private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      username: ['',Validators.required],
      contact: ['', Validators.required],
      pincode: ['', Validators.required],
      address: ['', Validators.required]
    })
  }
  get f() { return this.addressForm.controls; }

  onSubmit(){
      console.log(this.addressForm.invalid);
      console.log(this.addressForm.value);
      this.submitted = true;
      // if(this.registrationForm.invalid){
      //   return;
      // }
      this.loading = true;
      this.authenticationService.addAddress(this.addressForm.value)
      .subscribe(data => {console.log(data)
      });
      
    }
    // navigate(){
    //   this.router.navigate(['/bankdetails']); 
    // }
}
