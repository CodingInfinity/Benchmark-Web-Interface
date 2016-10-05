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
  private average: boolean = true;
  private measurementTypeFilter:Array<any> = [];
  private datasetFilter:Array<any> = [];
  private datasets:Array<any> = [];
  private summaryJobs:Array<any>=[];
  private showCompare:boolean = false;
  private compareLoaded: boolean = true;
  private compareExperiments:Array<any>=[];
  private compareExperimentsSelected:Array<any>=[];
  
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
      this.getCompareExperiments();
    });
    this.measurementTypeFilter.push("CPU");
    this.measurementTypeFilter.push("TIME");
    this.measurementTypeFilter.push("MEM");
  }

  getCompareExperiments(){
    
  }

  getExperiment(){
    this.client.getExperimentByIdWithGET(this.id).subscribe((res:Response)=>{
      this.experiment = JSON.parse(res.text())['experiment'];
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
        switch(job.measurementType){
          case "TIME":
            data[0] = data[0]/1000;
            job.barChartData = [{data:data, label:'Wall Time (s)'}];
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
        this.addJobToSummaryJobs(job);
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

  changeReport(){
    this.average = !this.average;
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

  private experimentChange(value:any){
    for(var option of value.target){
      if(option.selected && !option.disabled){
        if(!this.compareExperimentsSelected.includes(option.value)){
          this.compareExperimentsSelected.push(option.value);
        }
      }else if(!option.selected && !option.disabled){
        if(this.compareExperimentsSelected.includes(option.value)){
          var index = this.compareExperimentsSelected.indexOf(option.value)
          this.compareExperimentsSelected.splice(index,1);
        }
      }
    }
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

  checkIfJobExists(incoming_job:any):any{
    for(var job of this.summaryJobs){
      if(job.dataset.name == incoming_job.dataset.name && job.measurementType == incoming_job.measurementType){
        return job;
      }
    }
    return null;
  }

  addJobToSummaryJobs(incoming_job:any){
    let job:any = this.checkIfJobExists(incoming_job);
    if(job == null){
      job = {};
      job.dataset = incoming_job.dataset;
      job.algorithm = incoming_job.algorithm;
      job.measurementType = incoming_job.measurementType;
      job.barChartData = [];
      job.barChartData.push(incoming_job.barChartData[0]);
      job.labels = incoming_job.labels;
      this.createJobStats(job);
      this.summaryJobs.push(job);
    }else{
      if(!incoming_job.onQueue){
        job.barChartData.push(incoming_job.barChartData[0]);
        this.createJobStats(job);
      }

    }
  }

  createJobStats(job:any){
    let min:number = 9999999999;
    let max:number = -1;
    let average:number = 0;
    let total:number = 0;
    let count:number = 0;
    for(var data of job.barChartData){
      for(var i=0; i<data.data.length; i++){
        if(data.data[i] > max){
          max = data.data[i];
        }
        if(data.data[i] < min){
          min = data.data[i];
        }
        total += data.data[i];
        count ++;
      }
    }
    average = total/count;
    job.min = min;
    job.max = max;
    job.average = average;
  }
}
