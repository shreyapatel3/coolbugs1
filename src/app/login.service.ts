import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Login } from './login'
import { UserDetails } from './UserDetails';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrlLogin = 'http://172.24.138.77:8000/user';

  constructor(private http: HttpClient) { }
  createUser(user: UserDetails): Observable<any> {
    console.log(user.userid);
    return this.http.post('${this.baseUrlLogin}/login', user);
  }
  getUserDetails(): Observable<any>{
    return this.http.get('${this.baseUrlLogin}/login');
  }
}
