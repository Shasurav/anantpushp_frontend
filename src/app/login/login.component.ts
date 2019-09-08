import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import {AuthenticationService } from '../services/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss' ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, 
              private router: Router, private authenticationService: AuthenticationService) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required,Validators.minLength(10)]],
      password: ['', Validators.required]
  });

  // reset login status
    this.authenticationService.logout();
    console.log('login page')
  }
 get f() { return this.loginForm.controls; }

 onSubmit() {
     this.submitted = true;

     if (this.loginForm.invalid) {
         return;
     }
     this.loading = true;
     this.authenticationService.login(this.f.username.value, this.f.password.value)
         .pipe(first())
         .subscribe(
             data => {
               console.log('lets see');
               this.router.navigate(['/dashboard']);
             },
             error => {
                 this.error = error;
                 this.loading = false;
             });
 }
 numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}
onSearchChange(username : string) { 
  if(username.length > 10){
    this.loginForm.get('username').setValue(username.slice(0,10));
  }
} 
goToRegistration(){
  this.router.navigate(['/registration']);
}
}
