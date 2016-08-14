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
  selector: 'viewuseralgorithms',
  template: require('./algorithm.view.user.component.html'),
  styles: [require('./algorithm.view.user.component.css')],
  directives: [
    MaterializeDirective,
    NavigationComponent,
    FooterComponent,
    UploadComponent,
    EditorComponent,
  ]
})

export class ViewUsersAlgorithmsComponent extends SecureComponent {
  private algorithms: Array<Object>;
  constructor(router:Router, protected client: APIService, private fb: FormBuilder, private fileUpload: FileUploadService){
    super(router, client);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
    this.getUserAlgorithms();

  }


  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void{
    super.routerOnActivate(curr, prev, currTree, prevTree);
  }

  getUserAlgorithms(){
    this.client.getUsersAlgorithmsGET().subscribe((res)=>{
      this.algorithms = JSON.parse(res.text());
      console.log(this.algorithms);

    },(err)=>{
      this.hasError = true;
      this.errorMessage = err.json()['message'];
    })
  }

}

