import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { getLocaleMonthNames } from '@angular/common';
import { TransactionsHistoryService } from './transactions-history.service';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss']
})
export class TransactionsHistoryComponent implements OnInit {

  transactions: Transaction[] = [];

  selected: { startDate: any, endDate: any};

  dateRangeForm: FormGroup;

  constructor(public transactionsService: TransactionsHistoryService) { }

  ngOnInit() {
    this.dateRangeForm = new FormGroup({"dateRange": new FormControl()});
    console.log(this.getDateStringFromString('2019-09-17T20:11:54.755600Z'));

    //get month start and current date and pass to service
    var currentDate = new Date();
    var firstDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    this.selected= {startDate: moment(firstDateOfMonth), endDate: moment(currentDate)};
    this.transactionsService.getUserTransactions(this.getDateStringFromDate(firstDateOfMonth),this.getDateStringFromDate(currentDate)).subscribe(
      transactions => {
        var i;
        for(i=0; i<transactions.length; i++) {
          var newObj: Transaction = new Transaction();
          newObj.product = transactions[i].product;
          newObj.amount = transactions[i].txnamount;
          newObj.currency = "INR";
          newObj.date = this.getDateStringFromString(transactions[i].date);
          newObj.co2positive = !(parseInt(transactions[i].delta)<0);
          newObj.co2value = ''+Math.abs(parseInt(transactions[i].delta));
          this.transactions.push(newObj);
        }
      }
    );
  }

  applyDateRange() {
    console.log(this.dateRangeForm.value);
    var startDate= this.dateRangeForm.value.dateRange.startDate;
    var endDate= this.dateRangeForm.value.dateRange.endDate;
    console.log(startDate);
    console.log(endDate);
    console.log(startDate.toDate());
    console.log(endDate.toDate());

    startDate = startDate.toDate();
    endDate = endDate.toDate();

    console.log(this.getDateStringFromDate(startDate));
    console.log(this.getDateStringFromDate(endDate));

    this.transactions = [];

    //service call to get the data
    this.transactionsService.getUserTransactions(this.getDateStringFromDate(startDate),this.getDateStringFromDate(endDate)).subscribe(
      transactions => {
        var i;
        for(i=0; i<transactions.length; i++) {
          var newObj: Transaction = new Transaction();
          newObj.product = transactions[i].product;
          newObj.amount = transactions[i].txnamount;
          newObj.currency = "INR";
          newObj.date = this.getDateStringFromString(transactions[i].date);
          newObj.co2positive = !(parseInt(transactions[i].delta)<0);
          newObj.co2value = ''+Math.abs(parseInt(transactions[i].delta));
          this.transactions.push(newObj);
        }
      }
    );
  }

  getDateStringFromDate(date: Date) {
    var dayString = date.getDate()<10?'0'+date.getDate():''+date.getDate();
    var month: number = date.getMonth()+1;
    var monthString = month<10?'0'+month:''+month;
    return date.getFullYear()+'-'+monthString+'-'+dayString;
  }

  getDateStringFromString(date: string) {
    var day: string = date.substr(8,2);
    var month: number = parseInt(date.substr(5,2));
    var year: string = date.substr(0,4);

    var hour: string = date.substr(11,2);
    var minutes: string = date.substr(14,2);
    var time = this.getTime(hour, minutes);

    return day+' '+this.getMonth(month)+' '+year+' '+time;
  }

  getMonth(month: number) {
    switch(month) {
      case 1:
        return 'Jan';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Apr';
      case 5:
        return 'May';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Aug';
      case 9:
        return 'Sep';
      case 10:
        return 'Oct';
      case 11:
        return 'Nov';
      case 12:
        return 'Dec';
    }
    return 'Jan';
  }

  getTime(hour, minutes) {
    var hourInt: number = parseInt(hour);
    var minutesInt: number = parseInt(minutes);
    
    var isAM: boolean = hourInt<12;

    hourInt = hourInt%12;
    return (hourInt<10?'0'+hourInt:''+hourInt)+':'+(minutesInt<10?'0'+minutesInt:''+minutesInt)+' '+(isAM?'AM':'PM');
  }

}

class Transaction {
  product: string;
  currency: string;
  amount: string;
  co2value: string;
  co2positive: boolean;
  date: string;

  constructor() {}
}