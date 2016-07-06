import { Component } from '@angular/core';
import {FormBuilder, ControlGroup, Validators, FORM_DIRECTIVES} from "@angular/common";
import {Router, ROUTER_DIRECTIVES, OnActivate, RouteSegment} from '@angular/router'

import {MaterializeDirective} from 'angular2-materialize';
import {AuthenticationService} from "../../services/authentication.service";
import {Http, Response} from "@angular/http";
import {APIService} from "../../services/api.service";
import {BaseComponent} from "../base.component";


@Component({
    selector: 'login',
    template: require('./login.component.html'),
    directives: [
      MaterializeDirective,
      ROUTER_DIRECTIVES,
      FORM_DIRECTIVES
    ]
})
export class LoginComponent extends BaseComponent implements OnActivate {

  private form: ControlGroup;

  constructor(private router: Router, private client: APIService, private fb: FormBuilder) {
    super();
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register() {
      this.router.navigate(['/register']);
  }

  login(value: any) {
    this.client.authenticate(value.username, value.password).subscribe((res:Response) => {
      localStorage.setItem('token', JSON.stringify(res.json()));

      var expiresIn = Number.parseFloat(res.json()["expires_in"]);
      var dateNow = Date.now();
      var expiryDate = dateNow + (expiresIn * 1000);

      localStorage.setItem('token_expires', expiryDate.toString());


      //When logged in, get the user_token
      this.client.getAccountUsingGET().subscribe((response)=>{
        localStorage.setItem('user_token', JSON.stringify(response.json()));
        this.hasError = false;
        this.router.navigate(['/home']);
      },(err)=>{
        this.errorMessage = err.json()["message"];
        this.hasError = true;
        this.client.logout();
      });

    },(err)=>{
      this.errorMessage = err.json()["error_description"];
      this.hasError = true;
    });
  }

  routerOnActivate(curr:RouteSegment){
    if(this.client.authenticated()){
      this.router.navigate(['/home']);
    }
  }
}
