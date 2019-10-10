import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DashboardTransaction } from './dashboard-transaction';
import { DatePipe } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class DashboardService {1
  configUrl = 'http://192.168.43.167:8000/user/getdata/?userID=aaditya.pandilwar@gmail.com';
  walletAmountUrl = 'http://192.168.43.167:8000/user/rewards/?userID=aaditya.pandilwar@gmail.com';
  
  toDate = new Date();
  fromDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  constructor(private http: HttpClient, private datepipe: DatePipe) { }

  getWalletAmount(): Observable<any> {     
    return this.http.get(this.walletAmountUrl);
  }

  getUserTransactions(): Observable<any> {
    return this.http.get(this.configUrl + '&tdate=' + this.datepipe.transform(this.toDate, 'yyyy-MM-dd') 
    + '&fdate=' + this.datepipe.transform(this.fromDate, 'yyyy-MM-dd') );
  }

}
