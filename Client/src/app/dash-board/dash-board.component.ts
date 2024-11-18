import { ManagementService } from './../../service/management.service';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { ArticleService } from 'src/service/article.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent implements OnInit, OnDestroy {
  @Input() timePipe: string;
  loggedinUser: string;
  loggedinUserfirstName: string;
  loggedinUserlastName: string;
 
  array: [];

  userData: any;
  userCount: number = 1;
  userCount1: number = 1;
  articleCount: number = 1;
  articleCount1: number = 1;
  adminUser: number;
  guestUser: number;
  articleValue: number;
  articleValue1: number;

  activityFeedUserRegistered: any[]=[];
  activityFeedUserUpdated: any[]=[];
  activityFeedArticleCreated:any[]= [];
  activityFeedArticleUpdated: any[]=[];
  activity:any[]=[];

  date: Date = new Date();
  time = new Date();
  rxTime = new Date();
  intervalId;
  subscription: Subscription;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  ChartType: [];

  private dataset: BehaviorSubject<any> = new BehaviorSubject({});
  constructor(
    private _snackBar: MatSnackBar,
    private articleService: ArticleService,
    private managementService: ManagementService
  ) {}


   ngOnInit() {
    // forkJoin
    this.pieChartData;
    //  Activitie Feed For Article
    this.articleService.activityFeedArticleCreated(this.activityFeedArticleCreated).subscribe((res: any) => {
      this.activityFeedArticleCreated = res.data[0];
    })
    this.articleService.activityFeedArticleUpdated(this.activityFeedArticleUpdated).subscribe((res: any) => {
      this.activityFeedArticleUpdated = res.data[0];
    })

    // Activitie Feed For User
    this.managementService.activityFeedUserRegistered(this.activityFeedUserRegistered).subscribe((res: any) => {
      this.activityFeedUserRegistered = res.data[0];
    })
    this.managementService.activityFeedUserUpdated(this.activityFeedUserUpdated).subscribe((res: any) => {
      this.activityFeedUserUpdated = res.data[0];    
    })
    

    this.managementService.userList(this.userData).subscribe((res: any) => {
      this.userData = res.data[0];
      this.userData.forEach((element) => {
        if (element.admin == 'true') {
          this.adminUser = this.userCount++;
        } else {
          this.guestUser = this.userCount1++;
        }
        
      });
      this.pieChartData.datasets[0].data[0] = this.adminUser;
      this.pieChartData.datasets[0].data[1] = this.guestUser;
      this.pieChartData.labels[0] = 'Admin User';
      this.pieChartData.labels[0] = 'Guest User';
    })


    this.articleService.userarticleData(this.userData).subscribe((res: any) => {
      let userarticleData = res.data;
      userarticleData.forEach((element) => {
        if (element.admin == 'true') {
          this.adminUser = this.articleCount++;
        } else {
          this.guestUser = this.articleCount1++;
        }
 
      });
        this.pieChartData.datasets[1].data[0] = this.adminUser;
        this.pieChartData.datasets[1].data[1] = this.guestUser;
        this.pieChartData.labels[0] = 'Admin'
        this.pieChartData.labels[1] = 'Guest'
    })


    // Using Basic Interval
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe((time) => {
        this.rxTime = time;
      });

      this.setTime();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  setTime() {
    setTimeout(() => {
      var area1 = this.activityFeedUserRegistered.map((item) => {
        return { createdDate: item.createdAt, UpdatedDate: item.createdAt, user: item.userName}
      })

      var area2 = this.activityFeedUserUpdated.map((item) => {
        return { createdDate: item.createdAt, UpdatedDate: item.updatedDate, user: item.userName}
      })

      var area3 = this.activityFeedArticleCreated.map((item) => {
        return {createdDate: item.createdAt, UpdatedDate: item.createdAt, user: item.createdBy, data:item.data }
      })

      var area4 = this.activityFeedArticleUpdated.map((item) => {
        return { createdDate: item.createdAt, UpdatedDate: item.updatedDate, user:item.createdBy, data:item.data  }
      })

	    const x = area1.concat(area2)
      const y = area3.concat(area4)
      const z = x.concat(y)
     
      this.activity = z.sort((a:any,b:any)=>{
        return b.UpdatedDate.localeCompare(a.UpdatedDate);
      })

    }, 300);

  }  

  // Notification Code
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }



  //   chartDisplay
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };

  public chartType: ChartType = 'pie';
  public barChartType: ChartType = this.chartType;
  public barChartPlugins = [DataLabelsPlugin];

  public pieChartData: ChartData<'bar', number[], string | string[]> = {
    labels: [ ['Admin Users' ], [ 'Guest Users'] ],
    datasets: [ {
      data: [ 3, 10 ], label: 'Users'
    },
    { data: [5 , 5], label: 'Airticle' },
  ]
  };

  // events
  public chartClicked({
    event, active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
  }

  public chartHovered({
    event, active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
  }

}
