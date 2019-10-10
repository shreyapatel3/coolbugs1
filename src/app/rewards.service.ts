import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable ,of} from 'rxjs';
import {UserFullDetails} from './UserFullDetails'
import { setDefaultService } from 'selenium-webdriver/edge';
@Injectable({
  providedIn: 'root'
})
export class RewardsService {
  user=new UserFullDetails();
  
  constructor(private http:HttpClient) { 
    
  }
  
  getRewards():Observable<any>{
    return this.http.get('http://104.211.223.146:8000/user/rewards/?userID=aaditya.pandilwar@gmail.com');
    
    
  }
  setRewards(user:Object){
    console.log("service called");
    this.setUser();
    return this.http.post('http://104.211.223.146:8000/user/encash',{'userID':'aaditya.pandilwar@gmail.com'}).subscribe((response:any)=>{
      console.log(response);
     // this.assignRewards();
  });
  }
  setUser(){
    this.user.userID="nishant.patel@gmail.com";
    this.user.pass="password";
  }
}
