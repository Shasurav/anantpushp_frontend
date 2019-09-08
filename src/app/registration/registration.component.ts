import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User;
  submitted: boolean= false;
  loading: boolean= false;
  registrationForm: FormGroup;
  constructor(private router:Router,private formBuilder:FormBuilder,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      phonenumber: ['',Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    })
  }

  get f() { return this.registrationForm.controls; }

  registration(){
    this.submitted = true;
    if(this.registrationForm.invalid){
      return;
    }
    this.loading = true;
    this.authenticationService.registration(this.registrationForm.value)
    .subscribe(data => console.log(this.registrationForm.value))

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
