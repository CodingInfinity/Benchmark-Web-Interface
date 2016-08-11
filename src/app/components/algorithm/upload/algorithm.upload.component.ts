import { Component } from "@angular/core";
import {Router, RouteSegment, RouteTree} from "@angular/router";
import {MaterializeDirective } from "angular2-materialize";

import {UploadComponent} from "../../upload/upload.component";
import {NavigationComponent} from "../../navigation/navigation.component";
import {FooterComponent} from "../../footer/footer.component";
import {EditorComponent} from "../../tinymce/tinymce";
import {SecureComponent} from "../../../services/secure.component";
import {APIService} from "../../../services/api.service";
import {FormBuilder, Validators, ControlGroup} from "@angular/common";
import {FileUploadService} from "../../../services/file.upload.service";

@Component({
  selector: 'uploadalgorithm',
  template: require('./algorithm.upload.component.html'),
  styles: [require('./algorithm.upload.component.css')],
  directives: [
    MaterializeDirective,
    NavigationComponent,
    FooterComponent,
    UploadComponent,
    EditorComponent,
  ]
})

export class UploadAlgorithmComponent extends SecureComponent {

  private form: ControlGroup;
  private fileList:FileList = null;
  private descriptionHtml: string;
  private uploadProgress: number = 0;
  private uploadInProgress: boolean = false;
  private totalFileSize: any = 0;
  private uploadedFileSize: any = 0;
  private categoriesChosen: Array<number> = [];
  private categories: any = 0;

  tinyModel="Default";

  constructor(router:Router, protected client: APIService, private fb: FormBuilder, private fileUpload: FileUploadService){
    super(router, client);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
    this.form = fb.group({
      name: ['', Validators.required],
    });

  }

  onFilesSelect(value:FileList){
    this.hasError = false;
    this.fileList = value;
    for(var i=0; i < this.fileList.length; i++){
      this.totalFileSize += this.fileList[i].size;
    }
    this.totalFileSize /= (1000*1000);
    this.totalFileSize = this.totalFileSize.toFixed(2);
  }

  editorContentChanged(value:any){
    this.descriptionHtml = value;
  }

  onSubmit(value:any){
    if(this.categoriesChosen.length == 0){
      this.hasError = true;
      this.errorMessage = "You must select at least one category";
      return;
    }

    if(this.fileList == null){
      this.hasError = true;
      this.errorMessage = "Please select a file to upload";
      return;
    }

    this.uploadInProgress = true;
    this.fileUpload.getObserver().subscribe(progress => {
      this.uploadProgress = progress;
      this.uploadedFileSize = (this.totalFileSize * (progress/100.0)).toFixed(2);
      console.log(this.uploadedFileSize);
      if(progress == 100){
        this.showMessage = true;
        this.message = "Your file has been successfully uploaded";
        this.uploadInProgress = false;
      }
    });

    try{
      this.fileUpload.uploadFiles(value.name, this.descriptionHtml, this.categoriesChosen, this.fileList, "http://localhost:8081/api/repo/algorithm");
    }catch(error){
      console.log(error);
    }
  }

  categoryChange(value:any){
    this.hasError = false;
    for(var option of value.target){
      if(option.selected && !option.disabled){
        if(!this.categoriesChosen.includes(parseInt(option.value))){
          this.categoriesChosen.push(parseInt(option.value));
        }
      }else if(!option.selected && !option.disabled){
        if(this.categoriesChosen.includes(parseInt(option.value))){
          var index = this.categoriesChosen.indexOf(parseInt(option.value));
          this.categoriesChosen.splice(index,1);
        }
      }
    }
  }

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void{
    super.routerOnActivate(curr, prev, currTree, prevTree);
    //When the api call for all algorithm categories has been implemented, then we get the data here
    this.categories = JSON.parse('[{"id":1, "name": "Sorting Algorithms"},{"id":2, "name": "Genetic Algorithms"}]');
    console.log(this.categories);
  }


}
