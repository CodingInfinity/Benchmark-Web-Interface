'use strict';

import { Component } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';
import {Router, ROUTER_DIRECTIVES} from '@angular/router'
import {FormBuilder, ControlGroup, Validators, FORM_DIRECTIVES} from "@angular/common";
import {Client, RequestPasswordResetRequest} from "../../../../services/api.service";
import {BaseComponent} from "../../../base.component";

@Component({
    selector: 'resetRequest',
    template: require('./reset.request.component.html'),
    directives: [MaterializeDirective]
})
export class ResetRequestComponent extends BaseComponent{
  private emailSent: boolean;
  private email: string;
  private form: ControlGroup;
  constructor(private router: Router, private fb: FormBuilder, private api: Client) {
    super();
    this.emailSent = false;
    this.form = fb.group({
      email: ['', Validators.required]
    });
  }

  reset_password_init(value: any){
    this.email = value.email;
    var passReset: RequestPasswordResetRequest = {
      email: value.email,
    };

    this.api.requestPasswordResetUsingPOST(passReset).subscribe(
      (response)=>{
        this.hasError = false;
        this.emailSent = true;
      },(err)=>{
        this.errorMessage = err.json()["message"];
        this.hasError = true;
        this.emailSent = false;
      });
  }
}
