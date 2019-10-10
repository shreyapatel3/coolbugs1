import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Login } from './login'
import { UserDetails } from './UserDetails';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrlLogin = 'http://192.168.43.220:8000/user';

  constructor(private http: HttpClient) { }
  createUser(user: UserDetails): Observable<any> {
    console.log(user.userID);
    console.log(user.pass);
    return this.http.post('http://192.168.43.167:8000/user/login/', {"userID":user.userID, "pass":user.pass});
  }
}
