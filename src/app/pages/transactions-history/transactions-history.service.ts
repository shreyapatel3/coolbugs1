import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsHistoryService {1
  configUrl = 'http://104.211.223.146:8000/user/getdata/?userID=aaditya.pandilwar@gmail.com';
  walletAmountUrl = 'http://104.211.223.146:8000/user/rewards/?userID=aaditya.pandilwar@gmail.com';
  
  toDate = new Date();
  fromDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  constructor(private http: HttpClient) { }

  getUserTransactions(fromDate: string, toDate: string): Observable<any> {
    return this.http.get(this.configUrl + '&tdate=' + toDate 
    + '&fdate=' + fromDate );
  }

}