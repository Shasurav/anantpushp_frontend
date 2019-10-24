import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../model/user';
import { Registration } from '../model/registration';
// import { error } from 'console';
import { ok } from 'assert';
import { Address } from '../model/address';
import { Bankdetails } from '../model/bankdetails';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    show: string;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    registration(registration: Registration) {
        console.log(registration);
        const body = {
            contact : registration.phonenumber,
            password :registration.passwordGroup.password,
            name : registration.fullname
        }
        // return this.http.post<any>('http://localhost:3000/user/signup', body)
        return this.http.post<any>('http://3.17.148.164/user/signup', body)

      }

      addAddress(address: Address) {
        console.log(address);
        const body = {
            contact : address.phonenumber,
            pincode :address.pincode,
            address :address.address,
            name : address.fullname
        }
        return this.http.post<any>('http://localhost:3000/user/address', body)
      }
      addBankDetails(bankdetails: Bankdetails) {
        console.log(bankdetails);
        const body = {
            ifsc : bankdetails.ifsc,
            accountnumber :bankdetails.accountnumber,
            bankname :bankdetails.bankname,
            name : bankdetails.fullname
        }
        return this.http.post<any>('http://localhost:3000/user/bankdetails', body)
    }
    login(username: string, password: string) {
        const body = new HttpParams()
        .set('contact', username)
        .set('password', password);
        // return this.http.post<any>('http://localhost:3000/user/login', body)
        return this.http.post<any>('http://3.17.148.164/user/login', body)
            .pipe(map(user => {
                console.log(user);
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }
    getUserDetails(){
        return this.http.get('http://3.17.148.164/user/login');
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
