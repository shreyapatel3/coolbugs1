import { Component, OnInit, OnDestroy } from '@angular/core';
import Chart from 'chart.js';
import { DashboardService } from './dashboard.service';
import { Observable, timer } from 'rxjs';
import { DashboardTransaction } from './dashboard-transaction';
import { getDefaultService } from 'selenium-webdriver/chrome';
import { getLocaleDayNames } from '@angular/common';
import { throws } from 'assert';


@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit, OnDestroy {

  public canvas: any;
  public ctx;
  public chartColor;
  public consumptionStat;
  public userBehavior;
  public timerSubscription;
  public transactions: DashboardTransaction[];
  public walletBalance;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.chartColor = "#FFFFFF";
    this.refreshData();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private refreshData(): void {
    this.dashboardService.getWalletAmount().subscribe(obj => {
      if(obj[0] ) {
      this.walletBalance = obj[0].walletamount;
      }
    })
    this.dashboardService.getUserTransactions().subscribe(transactions => {
      console.log("tran" + transactions);
      this.transactions = transactions;
      this.initialiseUserBehaviour();
      this.initialiseConsumptionStat();
      this.subscribeToData();
    });
    //this.dashboardService.nextTransaction();
  }

  private subscribeToData(): void {
    this.timerSubscription = timer(500000).subscribe(() => this.refreshData());
  }

  private getDays(): any {
    const todayDate = new Date();
    const dates: string[] = [];
    for (let i = 1; i < todayDate.getDate(); i++) {
      if (i < 10) {
        dates.push('0' + i + '/' + (todayDate.getMonth() + 1 )+ '/' + todayDate.getFullYear());
      } else {
        dates.push(i + '/' + (todayDate.getMonth() + 1 )+ '/' + todayDate.getFullYear());
      }
    }
    return dates;
  }

  private getDisplayDays(): any {
    const todayDate = new Date();
    const dates: string[] = [];
    for (let i = 1; i < todayDate.getDate(); i++) {
      if (i < 10) {
        dates.push('0' + i );
      } else {
        dates.push(i + "");
      }
    }
    return dates;
  }


  private getDateWiseDataset(productType: string): any {
    const dates: string[] = this.getDays();
    const productTypeTransactions = this.transactions.filter(transaction => transaction.product.toLowerCase() === productType.toLowerCase());
    const data : number[] = new Array<number>(dates.length);
    for(let i = 0; i < dates.length; i++) {
      data[i] = productTypeTransactions.filter(transaction => 
        transaction.date.substr(8,2) +'/' + transaction.date.substr(5,2) + '/' + transaction.date.substr(0,4) === dates[i]).reduce((sum, item) => sum + item.delta, 0);
    }
    return data;
  }

  private getDataViaType(): any {
    return [
      this.transactions.filter(transaction => transaction.product.toLowerCase() === 'Petrol'.toLowerCase()).reduce((sum, item) => sum + item.delta, 0),
      this.transactions.filter(transaction => transaction.product.toLowerCase() === 'LPG'.toLowerCase()).reduce((sum, item) => sum + item.delta, 0),
      this.transactions.filter(transaction => transaction.product.toLowerCase() === 'Agriculture'.toLowerCase()).reduce((sum, item) => sum + item.delta, 0),
      this.transactions.filter(transaction => transaction.product.toLowerCase() === 'Solar'.toLowerCase()).reduce((sum, item) => sum + item.delta, 0),
      this.transactions.filter(transaction => transaction.product.toLowerCase() === 'Diesel'.toLowerCase()).reduce((sum, item) => sum + item.delta, 0),
      this.transactions.filter(transaction => transaction.product.toLowerCase() === 'Paperbag'.toLowerCase()).reduce((sum, item) => sum + item.delta, 0),
      this.transactions.filter(transaction => transaction.product.toLowerCase() === 'CNG'.toLowerCase()).reduce((sum, item) => sum + item.delta, 0)
    ];
  }

  initialiseUserBehaviour() {
    this.canvas = document.getElementById("userBehavior");
    this.ctx = this.canvas.getContext("2d");

    let dataContent = {
      labels: this.getDisplayDays(),
      datasets: [{
        label: 'Petrol',
        backgroundColor: "#E3E3E3",
        data: this.getDateWiseDataset('Petrol')
      },
      {
        label: 'LPG',
        backgroundColor: "#51cbce",
        data: this.getDateWiseDataset('LPG')
      },
      {
        label: 'Agriculture',
        backgroundColor: "#ef8157",
        data: this.getDateWiseDataset('Agriculture')
      },
      {
        label: 'Solar',
        backgroundColor: "#6bd098",
        data: this.getDateWiseDataset('Solar')
      },
      {
        label: 'Diesel',
        backgroundColor: "#032914",
        data: this.getDateWiseDataset('Diesel')
      },
      {
        label: 'Paperbag',
        backgroundColor: "#8282e9",
        data: this.getDateWiseDataset('Paperbag')
      },
      {
        label: 'CNG',
        backgroundColor: "#a9c5b6",
        data: this.getDateWiseDataset('CNG')
      }     
      ]
    }

    this.userBehavior = new Chart(this.ctx, {
      type: 'bar',

      data: dataContent,
      options: {
        title: {
          display: false,
          text: 'Chart.js Bar Chart - Stacked'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    });

  }

  initialiseConsumptionStat() {

    this.canvas = document.getElementById("consumptionStat");
    this.ctx = this.canvas.getContext("2d");
    this.consumptionStat = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: [1, 2, 3],
        datasets: [{
          label: "Category",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: [
            '#E3E3E3',
            '#51cbce',
            '#ef8157',
            '#6bd098',
            '#032914',
            '#8282e9',
            '#a9c5b6'
          ],
          borderWidth: 0,
          data: this.getDataViaType()
        }]
      },

      options: {

        legend: {
          display: false
        },

        pieceLabel: {
          render: 'percentage',
          fontColor: ['white'],
          precision: 2
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent"
            },
            ticks: {
              display: false,
            }
          }]
        },
      }
    });

  }
}
