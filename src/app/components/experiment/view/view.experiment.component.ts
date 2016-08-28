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
        this.checkJobOnQueue(job);
      }
    },(err)=>{
      this.hasError = true;
      this.errorMessage = JSON.parse(err)['message'];
    });
  }

  checkJobOnQueue(job:any){
    this.client.isJobOnQueue(job.id).subscribe((res:Response)=>{
      var onQueue = JSON.parse(res.text());
      job.onQueue = onQueue['onQueue'];
      console.log(job);
      this.numberOfJobsLoaded ++;
      if(this.numberOfJobsLoaded == this.numberOfJobs){
        this.loaded = true;
      }
    });
  }

  viewReport(job:any){
    console.log("Report Here");
  }

  viewAverageReport(experiment:any){
    console.log("Average report here");
  }
}
