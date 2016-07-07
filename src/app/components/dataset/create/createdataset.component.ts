import { Component } from "@angular/core";
import {Router, RouteSegment, RouteTree} from "@angular/router";
import { MaterializeDirective } from "angular2-materialize";
import {NavigationComponent} from "../../navigation/navigation.component";
import {EditorComponent} from "../../tinymce/tinymce";
import {FooterComponent} from "../../footer/footer.component";
import {SecureComponent} from "../../../services/secure.component";
import {Client, CreateManagedUserRequest} from "../../../services/api.service";
import {ControlGroup, FormBuilder, Validators} from "@angular/common";

@Component({
  selector: 'createdataset',
  template: require('./createdataset.component.html'),
  styles: [require('./createdataset.component.css')],
  directives: [
    MaterializeDirective,
    NavigationComponent,
    FooterComponent,
    EditorComponent
  ]
})

export class CreateDatasetComponent extends SecureComponent {
  private form: ControlGroup;
  tinyModel="Default";

  constructor(router:Router, protected client: Client, private fb: FormBuilder, private api: Client){
    super(router, client);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void{
    super.routerOnActivate(curr, prev, currTree, prevTree);
  }


}
