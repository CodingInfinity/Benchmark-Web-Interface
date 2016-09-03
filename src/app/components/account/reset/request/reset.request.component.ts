'use strict';

import { Component } from '@angular/core';
import {Router} from '@angular/router'
import {APIService, RequestPasswordResetRequest} from "../../../../services/api.service";
import {BaseComponent} from "../../../base.component";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'resetRequest',
    template: require('./reset.request.component.html'),
    styles: [require('./reset.request.component.css')]
})
export class ResetRequestComponent extends BaseComponent{
  private form: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private api: APIService) {
    super();
    this.showMessage = false;
    this.form = fb.group({
      email: ['', Validators.required]
    });
  }

  reset_password_init(value: any){
    this.message = "An email has been sent to " + value.email;
    var passReset: RequestPasswordResetRequest = {
      email: value.email,
    };

    this.api.requestPasswordResetUsingPOST(passReset).subscribe(
      (response)=>{
        this.hasError = false;
        this.showMessage = true;
      },(err)=>{
        this.errorMessage = err.json()["message"];
        this.hasError = true;
        this.showMessage = false;
      });
  }
}
