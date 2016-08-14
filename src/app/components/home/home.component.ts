import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MaterializeDirective } from "angular2-materialize";

import { APIService } from "../../services/api.service";
import { SecureComponent } from "../../services/secure.component";

import { NavigationComponent } from "../navigation/navigation.component";
import { FooterComponent } from "../footer/footer.component";
import { UploadComponent} from "../upload/upload.component";
import { ControlGroup, FormBuilder, Validators} from "@angular/common";
import { ValidatorsOwn} from "../validators.own";
import { FileUploadService} from "../../services/file.upload.service";
import { FileBrowserComponent} from "../files/browser/file.browser.component";
import { EditorComponent} from "../tinymce/tinymce";

@Component({
  selector: 'home',
  template: require('./home.component.html'),
  styles: [require('./home.component.css')],
  directives: [
    MaterializeDirective,
    NavigationComponent,
    FooterComponent,
    UploadComponent,
    EditorComponent,
    FileBrowserComponent
  ]
})
export class HomeComponent extends SecureComponent {
    private form: ControlGroup;
    private fileList:FileList = null;
    private descriptionHtml: string;
    private uploadProgress: number = 0;
    private uploadInProgress: boolean = false;
    private totalFileSize: any = 0;
    private uploadedFileSize: any = 0;
    tinyModel="Default";

    constructor(router:Router, protected client: APIService, private fb: FormBuilder, private validators: ValidatorsOwn, private fileUpload: FileUploadService) {
      super(router, client);
      this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
      this.form = fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
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
