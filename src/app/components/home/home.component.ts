import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { APIService } from "../../services/api.service";
import { SecureComponent } from "../../services/secure.component";
import {Response} from "@angular/http";


@Component({
  selector: 'home',
  template: require('./home.component.html'),
  styles: [require('./home.component.css')],
})
export class HomeComponent extends SecureComponent {

  //Experiments
  private totalExperiments: number = 0;
  private newExperiments: number = 0;
  private ownExperiments: number = 0;
  private latestExperiment: number = 0;

  //Jobs
  private totalJobsCompleted: number = 0;
  private ownJobsCompleted: number = 0;
  private totalJobsOnQueue: number = 0;
  private ownJobsOnQueue: number = 0;

  //Algorithms
  private totalAlgorithms: number = 0;
  private newAlgorithms: number = 0;
  private ownAlgorithms: number = 0;
  private mostUsedAlgorithm: any = {};

  //Datasets
  private totalDatasets: number = 0;
  private newDatasets: number = 0;
  private ownDatasets: number = 0;
  private mostUsedDataset: any = {};

  //Graphs
  private weeklyData :any = {};

  private weeklyDataLabels:string[] = [];
  private weeklyDataData:Array<any> = [];
  private weeklyDataLoaded: boolean = false;

  //Line Chart
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label:'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label:'Series B'}
  ];
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

  constructor(router:Router, protected client: APIService) {
    super(router, client);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
  }


  ngOnInit(){
    super.ngOnInit();
    this.mostUsedAlgorithm.name = "Bubble Sort";
    this.mostUsedDataset.name = "Random Words";
    this.getWeeklyData();
  }

  getWeeklyData(){
    let daysOfTheWeek:string[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    this.client.getExperimentWeeklyReportWithGET().subscribe((res:Response)=>{
      this.weeklyData = JSON.parse(res.text());
      var index = daysOfTheWeek.indexOf(this.weeklyData.startDate.toLowerCase());
      console.log(this.weeklyData);

      for(var i=index+1; i < 7; i++){
        this.weeklyDataLabels.push(this.capitilise(daysOfTheWeek[i]));
      }
      for(var i=0; i <= index; i++){
        this.weeklyDataLabels.push(this.capitilise(daysOfTheWeek[i]));
      }
      var totalExperiments = {data:this.weeklyData['totalExperiments'].reverse(), label:'Total Experiments'};
      this.weeklyDataData.push(totalExperiments);

      var jobsCompleted = {data:this.weeklyData['jobsCompleted'].reverse(), label:'Jobs Completed'};
      this.weeklyDataData.push(jobsCompleted);

      var totalCPU = {data:this.weeklyData['totalCPU'].reverse(), label:'Total CPU Jobs'};
      this.weeklyDataData.push(totalCPU);

      var totalMem = {data:this.weeklyData['totalMemory'].reverse(), label:'Total Memory Jobs'};
      this.weeklyDataData.push(totalMem);

      var totalWall = {data:this.weeklyData['totalWallTime'].reverse(), label:'Total Wall Time Jobs'};
      this.weeklyDataData.push(totalWall);
      this.weeklyDataLoaded = true;
    })
  }

  capitilise(str:string){
    return str.substring(0,1).toUpperCase() + str.substring(1).toLowerCase();
  }
}
