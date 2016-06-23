import { Component } from '@angular/core';
import {FormBuilder, ControlGroup, Validators, FORM_DIRECTIVES} from "@angular/common";
import {Router, ROUTER_DIRECTIVES, OnActivate, RouteSegment} from '@angular/router'

import {MaterializeDirective} from 'angular2-materialize';
import {AuthenticationService} from "../../services/authentication.service";


@Component({
    selector: 'login',
    template: require('./login.component.html'),
    directives: [
      MaterializeDirective,
      ROUTER_DIRECTIVES,
      FORM_DIRECTIVES
    ]
})
export class LoginComponent implements OnActivate{

  private form: ControlGroup;

  constructor(private router: Router, private auth: AuthenticationService, private fb: FormBuilder) {
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register() {
      this.router.navigate(['/register']);
  }

  login(value: any) {
    this.auth.authenticate(value.username, value.password);
  }

  routerOnActivate(curr:RouteSegment){
    if(this.auth.authenticated()){
      this.router.navigate(['/home']);
    }
  }
}
