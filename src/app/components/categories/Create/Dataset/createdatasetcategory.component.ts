import { Component } from "@angular/core";
import {Router} from "@angular/router";
import {SecureComponent} from "../../../../services/secure.component";
import {APIService} from "../../../../services/api.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'createDatasetCategory',
  template: require('./createdatasetcategory.component.html'),
  styles: [require('./createdatasetcategory.component.css')],
})

export class CreateDatasetCategoryComponent extends SecureComponent {
  private form:FormGroup;

  constructor(router:Router, protected client:APIService, private fb:FormBuilder, private api:APIService) {
    super(router, client);
    this.authorities = ["ROLE_ADMIN"];
    this.form = fb.group({
      categoryName: ['', Validators.required]
    });

  }

  ngOnInit()
  {
    super.ngOnInit();
  }

  register(value: any){
    let request:any = {};
    request.name = value.categoryName;

    this.api.createDatasetCategoryWithPOST(JSON.stringify(request)).subscribe(
      (response)=>{
        this.showMessage = true;
        this.hasError = false;
        this.message = "Your category was successfully created";
      },(err)=>{
        this.errorMessage = err.json()["message"];
        this.hasError = true;
        this.showMessage = false;
      });
  }
}
