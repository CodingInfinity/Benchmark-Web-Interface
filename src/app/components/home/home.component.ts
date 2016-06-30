import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MaterializeDirective } from "angular2-materialize";

import { Client } from "../../services/api.service";
import { SecureComponent } from "../../services/secure.component";

import { NavigationComponent } from "../navigation/navigation.component";
import { FooterComponent } from "../footer/footer.component";
import { UploadComponent} from "../upload/upload.component";
import {ControlGroup, FormBuilder, Validators} from "@angular/common";
import {ValidatorsOwn} from "../validators.own";

@Component({
  selector: 'home',
  template: require('./home.component.html'),
  styles: [require('./home.component.css')],
  directives: [
    MaterializeDirective,
    NavigationComponent,
    FooterComponent,
    UploadComponent
  ]
})
export class HomeComponent extends SecureComponent {
    private form: ControlGroup;
    private fileExample:any = null;
    constructor(router:Router, protected client: Client, private fb: FormBuilder, private validators: ValidatorsOwn) {
      super(router, client);
      this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
      this.form = fb.group({
        metadata: ['', Validators.required]
      });
    }

  onFilesSelect(value:any){
    this.fileExample = value;
  }

  onSubmit(value:any){
    console.log(value);
    console.log(this.fileExample);
    this.showMessage = true;
    this.message = "SUCCESS: " + value.metadata + " [" + this.fileExample[0].name+"]";
  }
}
