import { Component } from "@angular/core";
import {Router, RouteSegment, RouteTree} from "@angular/router";
import {MaterializeDirective } from "angular2-materialize";
import {NavigationComponent} from "../../../navigation/navigation.component";
import {FooterComponent} from "../../../footer/footer.component";
import {UploadComponent} from "../../../upload/upload.component";
import {EditorComponent} from "../../../tinymce/tinymce";
import {SecureComponent} from "../../../../services/secure.component";
import {ControlGroup, FormBuilder, Validators} from "@angular/common";
import {APIService} from "../../../../services/api.service";
import {FileUploadService} from "../../../../services/file.upload.service";



@Component({
  selector: 'viewuserdatasets',
  template: require('./dataset.view.user.component.html'),
  styles: [require('./dataset.view.user.component.css')],
  directives: [
    MaterializeDirective,
    NavigationComponent,
    FooterComponent,
    UploadComponent,
    EditorComponent,
  ]
})

export class ViewUsersDatasetsComponent extends SecureComponent {
  private datasets: Array<Object>;
  constructor(router:Router, protected client: APIService, private fb: FormBuilder, private fileUpload: FileUploadService){
    super(router, client);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
    this.getUserDatasets();
  }


  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void{
    super.routerOnActivate(curr, prev, currTree, prevTree);
  }

  getUserDatasets(){
    this.client.getUsersDatasetsGET().subscribe((res)=>{
      this.datasets = JSON.parse(res.text());
      console.log(this.datasets);

    },(err)=>{
      this.hasError = true;
      this.errorMessage = err.json();
    })
  }

}

