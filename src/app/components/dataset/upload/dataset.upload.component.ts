import { Component } from "@angular/core";
import {Router} from "@angular/router";
import {SecureComponent} from "../../../services/secure.component";
import {APIService} from "../../../services/api.service";
import {FileUploadService} from "../../../services/file.upload.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'uploaddataset',
  template: require('./dataset.upload.component.html'),
  styles: [require('./dataset.upload.component.css')],
})

export class UploadDatasetComponent extends SecureComponent {

  private form: FormGroup;
  private fileList:FileList = null;
  private descriptionHtml: string;
  private uploadProgress: number = 0;
  private uploadInProgress: boolean = false;
  private totalFileSize: any = 0;
  private uploadedFileSize: any = 0;
  private categoriesChosen: Array<number> = [];
  private categories: Array<Object>;
  private loaded: boolean = false;

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
      if(progress == 100){
        this.showMessage = true;
        this.message = "Your file has been successfully uploaded";
        this.uploadInProgress = false;
      }
    });

    try{
      this.fileUpload.uploadFile(value.name, this.descriptionHtml, this.categoriesChosen, this.fileList[0], "http://localhost:8081/api/repo/dataset");
    }catch(error){
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

  ngOnInit():void{
    super.ngOnInit();
    //When the api call for all algorithm categories has been implemented, then we get the data here
    this.client.getAllDatasetCategoriesGET().subscribe((res) =>{
      this.loaded = true;
      this.categories = res.json();
    },(err) =>{
      this.hasError = true;
      this.errorMessage = JSON.stringify(err.json());
    });
  }


}
