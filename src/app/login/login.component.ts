import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import {AuthenticationService } from '../services/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  // reset login status
    // this.authenticationService.logout();
    // console.log(this.route.snapshot.queryParams['returnUrl']);
    
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
               
                //  this.router.navigate([this.returnUrl]);
             },
             error => {
                 this.error = error;
                 this.loading = false;
             });
 }
}
