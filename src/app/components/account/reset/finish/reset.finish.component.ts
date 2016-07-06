'use strict';

import { Component } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';
import {Router, ROUTER_DIRECTIVES, OnActivate, RouteSegment} from '@angular/router'
import {FormBuilder, ControlGroup, Validators, FORM_DIRECTIVES} from "@angular/common";
import {APIService, CompletePasswordResetRequest} from "../../../../services/api.service";
import {ValidatorsOwn} from "../../../validators.own";
import {BaseComponent} from "../../../base.component";

@Component({
  selector: 'resetRequest',
  template: require('./reset.finish.component.html'),
  directives: [MaterializeDirective]
})
export class ResetFinishComponent extends BaseComponent implements OnActivate{
  private key: string;
  private form: ControlGroup;
  constructor(private router: Router, private fb: FormBuilder, private api: APIService, private validators: ValidatorsOwn) {
    super();
    this.form = fb.group({
      password: ['', Validators.required],
      confirmPassword:  ['', Validators.required]
    },{validator: this.validators.matchingPasswords('password', 'confirmPassword')});
  }

  reset_password_finish(value: any){
    var passResetFinish: CompletePasswordResetRequest = {
      key: this.key,
      newPassword: value.password,
    };

    this.api.finishPasswordResetUsingPOST(passResetFinish).subscribe(
      (response)=>{        
        this.router.navigate(['/login']);
      },(err)=>{
        this.errorMessage = err.json()["message"];
        this.hasError = true;
      });

  }

  setPasswordClass() {
    if(this.form.controls['password'].value ==""){return;}
    return {
      invalid: !this.form.valid,
      valid: this.form.valid
    }
  }
  routerOnActivate(curr:RouteSegment):void{
    this.key = curr.getParam('key');
    //console.log(this.key);
  }

}

