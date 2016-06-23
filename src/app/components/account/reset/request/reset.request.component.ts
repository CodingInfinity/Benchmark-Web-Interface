'use strict';

import { Component } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';
import {Router, ROUTER_DIRECTIVES} from '@angular/router'
import {FormBuilder, ControlGroup, Validators, FORM_DIRECTIVES} from "@angular/common";
import {Client, RequestPasswordResetRequest} from "../../../../services/api.service";

@Component({
    selector: 'resetRequest',
    template: require('./reset.request.component.html'),
    directives: [MaterializeDirective]
})
export class ResetRequestComponent {
  private form: ControlGroup;
  constructor(private router: Router, private fb: FormBuilder, private api: Client) {
    this.form = fb.group({
      email: ['', Validators.required]
    });
  }

  reset_password_init(value: any){
    var passReset: RequestPasswordResetRequest = {
      email: value.email,
    };

    this.api.requestPasswordResetUsingPOST(passReset).subscribe(
      (response)=>{
        console.log("Response here:");
        console.log(response);
      },(err)=>{
        console.log("Exception Caught:");
        console.log(err);
      });
  }
}
