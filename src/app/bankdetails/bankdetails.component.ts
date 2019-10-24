import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder,private router:Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.bankForm = this.formBuilder.group({
      username: ['',Validators.required],
      ifsc: ['', Validators.required],
      accountnumber: ['', Validators.required],
      bankname: ['', Validators.required]
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
      this.authenticationService.addBankDetails(this.bankForm.value)
      .subscribe(data => {console.log(data);
        this.router.navigate(['/order']);
      });
      
    }
    // navigate(){
    //   this.router.navigate(['/order']);
    // }
}
