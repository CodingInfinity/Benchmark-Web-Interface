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
  private filteredData: any;
  private experiment: any;
  private id:number;
  private numberOfJobs:number = 0;
  private numberOfJobsLoaded = 0;
  private loaded: boolean = false;
  private measurementTypeFilter:Array<any> = [];
  private datasetFilter:Array<any> = [];
  private datasets:Array<any> = [];
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
    this.measurementTypeFilter.push("CPU");
    this.measurementTypeFilter.push("TIME");
    this.measurementTypeFilter.push("MEM");
  }

  getExperiment(){
    this.client.getExperimentByIdWithGET(this.id).subscribe((res:Response)=>{
      this.experiment = JSON.parse(res.text())['experiment'];
      console.log(this.experiment);
      this.numberOfJobs = this.experiment.jobs.length;
      for(var job of this.experiment.jobs){
        if(!this.datasets.includes(job.dataset.name)){
          this.datasets.push(job.dataset.name);
          this.datasetFilter.push(job.dataset.name);
        }
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
            for(var i=0; i < data.length; i++){
              data[i] = data[i]/100;
            }
            job.barChartData = [{data:data, label:'CPU (%)'}];
            break;
          case "MEM":
            for(var i=0; i < data.length; i++){
              data[i] = data[i]/1024/1024;
            }
            job.barChartData = [{data:data, label:'Memory (MB)'}];
            break;
        }
        this.updateFilteredData();
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

  private typeChange(value:any){
    for(var option of value.target){
      if(option.selected && !option.disabled){
        if(!this.measurementTypeFilter.includes(option.value)){
          this.measurementTypeFilter.push(option.value);
        }
      }else if(!option.selected && !option.disabled){
        if(this.measurementTypeFilter.includes(option.value)){
          var index = this.measurementTypeFilter.indexOf(option.value)
          this.measurementTypeFilter.splice(index,1);
        }
      }
    }

    this.updateFilteredData();
  }

  private datasetChange(value:any){
    for(var option of value.target){
      if(option.selected && !option.disabled){
        if(!this.datasetFilter.includes(option.value)){
          this.datasetFilter.push(option.value);
        }
      }else if(!option.selected && !option.disabled){
        if(this.datasetFilter.includes(option.value)){
          var index = this.datasetFilter.indexOf(option.value)
          this.datasetFilter.splice(index,1);
        }
      }
    }

    this.updateFilteredData();
  }

  private updateFilteredData() {
    let newFilteredData:Array<any> = [];
    for (let obj of this.experiment.jobs) {
      if (this.measurementTypeFilter.includes(obj.measurementType) &&
        this.datasetFilter.includes(obj.dataset.name)) {
        newFilteredData.push(obj);
      }
    }
    this.filteredData = newFilteredData;
  }

}
