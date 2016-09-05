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
        job.labels = [];
        let data: Array<number> = [];
        var probeCount = 1;
        for(var measurement of job['measurements']){
          data.push(measurement.value);
          job.labels.push("Probe("+probeCount*this.experiment.probeInterval+"s)");
          probeCount++;
        }
        this.checkJobOnQueue(job);
        console.log(job);
        switch(job.measurementType){
          case "TIME":
            job.barChartData = [{data:data, label:'Wall Time (ms)'}];
            job.labels = ["Probe"];
            break;
          case "CPU":
            job.barChartData = [{data:data, label:'CPU (%)'}];
            break;
          case "MEM":
            job.barChartData = [{data:data, label:'Memory (mb)'}];
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

  getJobClass(type:string):any{
    switch(type){
      case "TIME":
            return {
              teal: true
            }
      case "CPU":
            return{
              amber:true
            }
      case "MEM":
            return {
              red:true
            }
    }
  }

}
