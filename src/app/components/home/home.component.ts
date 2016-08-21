import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { APIService } from "../../services/api.service";
import { SecureComponent } from "../../services/secure.component";
import { ValidatorService} from "../validators.service";
import { FileUploadService} from "../../services/file.upload.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'home',
  template: require('./home.component.html'),
  styles: [require('./home.component.css')],
})
export class HomeComponent extends SecureComponent {
    private form:FormGroup;
    private fileList:FileList = null;
    private descriptionHtml: string;
    private uploadProgress: number = 0;
    private uploadInProgress: boolean = false;
    private totalFileSize: any = 0;
    private uploadedFileSize: any = 0;
    tinyModel="Default";

    constructor(router:Router, protected client: APIService, private fb: FormBuilder, private validators: ValidatorService, private fileUpload: FileUploadService) {
      super(router, client);
      this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
      this.form = this.fb.group({
        name: ['', Validators.required]
      });
    }

  onFilesSelect(value:FileList){
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
    this.uploadInProgress = true;
    let categories: Array<number> = [1,2];
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
      this.fileUpload.uploadFiles(value.name, this.descriptionHtml, categories, this.fileList, "http://localhost:8081/api/repo/algorithm");
    }catch(error){
      console.log(error);
    }
  }
}
