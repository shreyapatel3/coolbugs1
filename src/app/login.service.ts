import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
//import { Login } from './login'
import { UserDetails } from './UserDetails';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrlLogin = 'http://192.168.43.167:8000/user';
  userDetails: UserDetails[] = [
    { userID: 'nishant.patel@gmail.com',  name: 'Nishant patel', gender: 'M', country: 'India', pass:'password', walletamount: 5000},
  ];

  constructor(private http: HttpClient) { }
  createUser(user: UserDetails): Observable<any> {
    return of(this.userDetails);
  }
}
