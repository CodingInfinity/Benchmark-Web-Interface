'use strict';

import { Component } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';
import {Router, ROUTER_DIRECTIVES, OnActivate, RouteSegment} from '@angular/router'
import {Client} from "../../../services/api.service";

@Component({
    selector: 'registerAccount',
    template: require('./activate.component.html'),
    directives: [
      MaterializeDirective,
      ROUTER_DIRECTIVES,]
})
export class ActivateAccountComponent implements OnActivate{
  private key: string;
  private activated: number;

  constructor(private router: Router, private api: Client) {
    this.activated = -1;
  }

  activate_account(){

    this.api.activateAccountUsingGET(this.key).subscribe(
      (response)=>{
        console.log("Response here:");
        console.log(response);
        this.activated = 0;
      },(err)=>{
        console.log("Exception Caught:");
        console.log(err);
        this.activated = 2;
      });
  }

  routerOnActivate(curr:RouteSegment):void{
    this.key = curr.getParam('key');
    this.activate_account();
  }
}
