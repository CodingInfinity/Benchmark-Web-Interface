'use strict';

import { Component } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';
import {Router, ROUTER_DIRECTIVES, OnActivate, RouteSegment} from '@angular/router'
import {Client} from "../../../services/api.service";
import {BaseComponent} from "../../base.component";

@Component({
    selector: 'registerAccount',
    template: require('./activate.component.html'),
    directives: [
      MaterializeDirective,
      ROUTER_DIRECTIVES,]
})
export class ActivateAccountComponent extends BaseComponent implements OnActivate{
  private key: string;
  private activated: number;

  constructor(private router: Router, private api: Client) {
    super();
    this.activated = -1;
  }

  activate_account(){

    this.api.activateAccountUsingGET(this.key).subscribe(
      (response)=>{
        this.activated = 0;
        this.hasError = false;
      },(err)=>{
        this.activated = 2;
        this.errorMessage = err.json()["message"];
        this.hasError = true;
      });
  }

  routerOnActivate(curr:RouteSegment):void{
    this.key = curr.getParam('key');
    this.activate_account();
  }
}
