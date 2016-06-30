'use strict';

import { Component } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';
import {FormBuilder, ControlGroup, Validators, FORM_DIRECTIVES} from "@angular/common";
import {Router, ROUTER_DIRECTIVES, RouteSegment, OnActivate} from '@angular/router'
import {Client, CreateUnmanagedUserRequest} from "../../../services/api.service";
import {ValidatorsOwn} from "../../validators.own";
import {AuthenticationService} from "../../../services/authentication.service";
import {BaseComponent} from "../../base.component";

@Component({
    selector: 'registerAccount',
    template: require('./register.component.html'),
    directives: [MaterializeDirective]
})
export class RegisterAccountComponent extends BaseComponent implements OnActivate{
  private form: ControlGroup;
  private passwords: any;

  constructor(private router: Router, private fb: FormBuilder, private api: Client, private validators: ValidatorsOwn) {
    super();
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      passwords: fb.group({
        password: ['', Validators.required],
        confirmPassword:  ['', Validators.required]
      },{validator: this.validators.matchingPasswords('password', 'confirmPassword')})
    });
    this.passwords =  this.form.controls['passwords'];
  }

  setPasswordClass() {
    if(this.passwords.controls['password'].value ==""){return;}
    return {
      invalid: !this.passwords.valid,
      valid: this.passwords.valid
    }
  }

  register(value: any){
    var user: CreateUnmanagedUserRequest = {
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName,
      password: value.passwords.password,
      username: value.username
    };

    this.api.registerAccountUsingPOST(user).subscribe(
    (response)=>{
      this.showMessage = true;
      this.hasError = false;
      this.message = "You have successfully registered! An email confirmation has been sent to " + user.email;
    },(err)=>{
      this.errorMessage = err.json()["message"];
      this.hasError = true;
      this.showMessage = false;
    });
  }

  routerOnActivate(curr:RouteSegment){
    if(this.api.authenticated()){
      this.router.navigate(['/home']);
    }
  }
}
