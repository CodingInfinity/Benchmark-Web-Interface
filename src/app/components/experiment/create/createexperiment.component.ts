import { Component } from "@angular/core";
import {Router, RouteSegment, RouteTree} from "@angular/router";
import { MaterializeDirective } from "angular2-materialize";
import {NavigationComponent} from "../../navigation/navigation.component";
import {EditorComponent} from "../../tinymce/tinymce";
import {FooterComponent} from "../../footer/footer.component";
import {SecureComponent} from "../../../services/secure.component";
import {APIService} from "../../../services/api.service";
import {ControlGroup, FormBuilder, Validators} from "@angular/common";
import {Response} from "@angular/http";

@Component({
  selector: 'createexperiment',
  template: require('./createexperiment.component.html'),
  styles: [require('./createexperiment.component.css')],
  directives: [
    MaterializeDirective,
    NavigationComponent,
    FooterComponent,
    EditorComponent
  ]
})

export class CreateExperimentComponent extends SecureComponent {
  private datasets: Array<Object>;
  private algorithms: Array<Object>;
  private datasetsChosen: Array<Object> = [];
  private algorithmsChosen: Array<Object> = [];
  private measurementTypesChosen: Array<Object> = [];
  private languageChosen: Array<Object> = [];
  private form: ControlGroup;
  constructor(router:Router, protected client: APIService, private fb: FormBuilder){

    super(router, client);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
    this.getAllAlgorithms();
    this.getAllDatasets();
    this.form = fb.group({
      probe: ['',Validators.required],
      jobs: ['',Validators.required],
      timeout: ['',Validators.required]
    });
  }

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void{
    super.routerOnActivate(curr, prev, currTree, prevTree);

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
      console.log(this.algorithms);

    },(err)=>{
      this.hasError = true;
      this.errorMessage = err.json();
    })
  }

  getAllDatasets(){
    this.client.getAllDatasetsGET().subscribe((res)=>{
      this.datasets = JSON.parse(res.text());
      console.log(this.datasets);

    },(err)=>{
      this.hasError = true;
      this.errorMessage = err.json();
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
    },(err:Error)=>{
      this.hasError = true;
      this.errorMessage = err.json()["message"];
    })
  }

}
