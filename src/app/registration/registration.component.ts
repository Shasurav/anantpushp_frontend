import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication.service';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  user: User;
  submitted: boolean= false;
  loading: boolean= false;
  registrationForm: FormGroup;
  constructor(private router:Router,private formBuilder:FormBuilder,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      phonenumber: ['',[Validators.required]],
      passwordGroup : this.formBuilder.group({
         password: ['', Validators.required],
         confirmpassword: ['',Validators.required]},{validator:this.passwordMatcher})
      
    });
  }

  get f() { return this.registrationForm.controls; }

  registration(){
    // this.router.navigate(['/login']);
    console.log(this.registrationForm.invalid);
    console.log(this.registrationForm.value);
    
    
    this.submitted = true;
    // if(this.registrationForm.invalid){
    //   return;
    // }
    this.loading = true;
    this.authenticationService.registration(this.registrationForm.value)
    .subscribe(data => {console.log(data)
      this.router.navigateByUrl('/login');
    });
    
  }
passwordMatcher: ValidatorFn = (passwordGroup: FormGroup): ValidationErrors | null => {
  const password = passwordGroup.get('password');
  const confirmpassword = passwordGroup.get('confirmpassword');
  return password && confirmpassword && password.value === confirmpassword.value ? { 'identityRevealed': true } : null;
};

  // numberOnly(event): boolean {
  //   const charCode = (event.which) ? event.which : event.keyCode;
  //   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
  //     return false;
  //   }
  //   return true;
  // }
  // onSearchChange(phonenumber : string) { 
  //   if(phonenumber.length > 10){
  //     this.registrationForm.get('phonenumber').setValue(phonenumber.slice(0,10));
  //   }
  // } 
 
}