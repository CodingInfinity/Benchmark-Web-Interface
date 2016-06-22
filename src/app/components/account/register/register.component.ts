'use strict';

import { Component } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';
import {FormBuilder, ControlGroup, Validators, FORM_DIRECTIVES} from "@angular/common";
import {Router, ROUTER_DIRECTIVES} from '@angular/router'
import {AuthenticationService} from "../../../services/authentication.service";
import {Client, CreateUnmanagedUserRequest} from "../../../services/api.service";

@Component({
    selector: 'registerAccount',
    template: require('./register.component.html'),
    directives: [MaterializeDirective]
})
export class RegisterAccountComponent {
  private form: ControlGroup;
  private passwords: any;

  constructor(private router: Router, private auth: AuthenticationService, private fb: FormBuilder, private api: Client) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      passwords: fb.group({
        password: ['', Validators.required],
        confirmPassword:  ['', Validators.required]
      },{validator: this.matchingPasswords('password', 'confirmPassword')})
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

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: ControlGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[confirmPasswordKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      }else{
        passwordConfirmationInput.setErrors(null);
      }
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

    this.api.registerAccountUsingPOST(user).subscribe((response)=>{
      if(response.status == 201){
        this.router.navigateByUrl('/');
      }else{
        console.log("Unknown code");
      }
    });
  }
}
