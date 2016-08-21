import { Component } from "@angular/core";
import {Router} from "@angular/router";
import {SecureComponent} from "../../../services/secure.component";
import {APIService} from "../../../services/api.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'createdataset',
  template: require('./createdataset.component.html'),
  styles: [require('./createdataset.component.css')],
})

export class CreateDatasetComponent extends SecureComponent {
  private form: FormGroup;
  tinyModel="Default";
  constructor(router:Router, protected client: APIService, private fb: FormBuilder){

    super(router, client);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
    this.form = fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit():void{
    super.ngOnInit();
  }


}
