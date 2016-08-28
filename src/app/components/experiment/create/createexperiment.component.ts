import { Component } from "@angular/core";
import {Router} from "@angular/router";
import {SecureComponent} from "../../../services/secure.component";
import {APIService} from "../../../services/api.service";
import {Response} from "@angular/http";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'createexperiment',
  template: require('./createexperiment.component.html'),
  styles: [require('./createexperiment.component.css')],

})

export class CreateExperimentComponent extends SecureComponent {
  private datasets: Array<Object>;
  private algorithms: Array<Object>;
  private datasetsChosen: Array<Object> = [];
  private algorithmsChosen: Array<Object> = [];
  private measurementTypesChosen: Array<Object> = [];
  private languageChosen: Array<Object> = [];
  private form: FormGroup;
  private datasetsLoaded: boolean = false;
  private algorithmsLoaded: boolean = false;
  constructor(router:Router, protected client: APIService, private fb: FormBuilder){

    super(router, client);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
    this.form = fb.group({
      probe: ['',Validators.required],
      jobs: ['',Validators.required],
      timeout: ['',Validators.required]
    });
  }

  ngOnInit():void{
    super.ngOnInit();
    this.getAllAlgorithms();
    this.getAllDatasets();
  }

  measurementChange(value:any){
    for(var option of value.target){
      if(option.selected && !option.disabled){
        if(!this.measurementTypesChosen.includes(option.value)){
          this.measurementTypesChosen.push(option.value);
        }
      }else if(!option.selected && !option.disabled){
        if(this.measurementTypesChosen.includes(option.value)){
          var index = this.measurementTypesChosen.indexOf(option.value)
          this.measurementTypesChosen.splice(index,1);
        }
      }
    }
  }

  datasetChange(value:any){
    for(var option of value.target){
      if(option.selected && !option.disabled){
        if(!this.datasetsChosen.includes(option.value)){
          this.datasetsChosen.push(option.value);
        }
      }else if(!option.selected && !option.disabled){
        if(this.datasetsChosen.includes(option.value)){
          var index = this.datasetsChosen.indexOf(option.value)
          this.datasetsChosen.splice(index,1);
        }
      }
    }
  }

  algorithmChange(value:any){
    for(var option of value.target){
      if(option.selected && !option.disabled){
        if(!this.algorithmsChosen.includes(option.value)){
          this.algorithmsChosen.push(option.value);
        }
      }else if(!option.selected && !option.disabled){
        if(this.algorithmsChosen.includes(option.value)){
          var index = this.algorithmsChosen.indexOf(option.value)
          this.algorithmsChosen.splice(index,1);
        }
      }
    }
  }

  languageChange(value:any){
    for(var option of value.target){
      if(option.selected && !option.disabled){
        if(!this.languageChosen.includes(option.value)){
          this.languageChosen.push(option.value);
        }
      }else if(!option.selected && !option.disabled){
        if(this.languageChosen.includes(option.value)){
          var index = this.languageChosen.indexOf(option.value)
          this.languageChosen.splice(index,1);
        }
      }
    }
  }

  getAllAlgorithms(){
    this.client.getAllAlgorithmsGET().subscribe((res)=>{
      this.algorithms = JSON.parse(res.text());
      this.algorithmsLoaded = true;
      console.log(this.algorithms);

    },(err)=>{
      //this.hasError = true;
      //this.errorMessage = err.json()['message'];
    })
  }

  getAllDatasets(){
    this.client.getAllDatasetsGET().subscribe((res)=>{
      this.datasets = JSON.parse(res.text());
      this.datasetsLoaded = true;
      console.log(this.datasets);

    },(err)=>{
      //this.hasError = true;
      //this.errorMessage = err.json()['message'];
    })
  }

  submitForm(value:any){
    let request:any = {};
    request.algorithm = this.algorithmsChosen[0];
    request.timeout = value.timeout;
    request.probeInterval = value.probe;
    request.datasets = this.datasetsChosen;
    request.measurementType = this.measurementTypesChosen;
    request.quantity = value.jobs;
    request.languageType = this.languageChosen[0];

    console.log(JSON.stringify(request));

    this.client.createExperimentWithPOST(JSON.stringify(request)).subscribe((res:Response)=>{
      console.log(res.json());
    },(err:any)=>{
      this.hasError = true;
      this.errorMessage = err.json()["message"];
    })
  }

}
