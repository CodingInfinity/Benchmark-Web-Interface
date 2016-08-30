import { Component } from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Response} from "@angular/http";
import {SecureComponent} from "../../../services/secure.component";
import {APIService} from "../../../services/api.service";

@Component({
  selector: 'viewexperiment',
  template: require('./view.experiment.component.html'),
  styles: [require('./view.experiment.component.css')],

})

export class ViewExperiment extends SecureComponent {
  private experiment: any;
  private id:number;
  private numberOfJobs:number = 0;
  private numberOfJobsLoaded = 0;
  private loaded: boolean = false;
  constructor(router:Router, protected client: APIService, private route: ActivatedRoute){

    super(router, client);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
  }

  ngOnInit():void{
    super.ngOnInit();
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.id = id;
      this.getExperiment();
    });
  }

  getExperiment(){
    this.client.getExperimentByIdWithGET(this.id).subscribe((res:Response)=>{
      this.experiment = JSON.parse(res.text())['experiment'];
      this.numberOfJobs = this.experiment.jobs.length;
      for(var job of this.experiment.jobs){
        console.log(job);
        let data: Array<number> = [];
        for(var measurement of job['measurements']){
          data.push(measurement.value);
        }
        this.checkJobOnQueue(job);
        job.barChartData = [{data:data, label:'Execution ('+job.id+')'}];
        switch(job.measurementType){
          case "TIME":
            job.labels = ["Wall Time (ms)"];
            break;
          case "CPU":
            job.labels = ["CPU (%)"];
            break;
          case "MEM":
            job.labels = ["Memory (mb)"];
            break;
        }

      }
    },(err)=>{
      this.hasError = true;
      this.errorMessage = JSON.parse(err)['message'];
    });
  }

  checkJobOnQueue(job:any){
    this.client.isJobOnQueueWithGET(job.id).subscribe((res:Response)=>{
      var onQueue = JSON.parse(res.text());
      job.onQueue = onQueue['onQueue'];
      this.numberOfJobsLoaded ++;
      if(this.numberOfJobsLoaded == this.numberOfJobs){
        this.loaded = true;
      }
    });
  }

  downloadCSV(job_id: number){
    this.client.getJobCSVWithGET(job_id).subscribe((res:Response)=>{
      var blob = new Blob([res.text()],{type:'text/csv'});
      var url = window.URL.createObjectURL(blob);
      window.open(url);
    })
  }

  viewAverageReport(experiment:any){
  }
}
