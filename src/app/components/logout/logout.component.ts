import { Component } from "@angular/core";
import { Router, OnActivate, RouteTree, RouteSegment } from "@angular/router";

import { AuthenticationService } from "../../services/authentication.service";
import {APIService} from "../../services/api.service";

@Component({
  template: require('./logout.component.html'),
})
export class LogoutComponent implements OnActivate {

  constructor(private router: Router, private client: APIService) {
  }

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void{
    this.client.logout();
    this.router.navigate(['/login']);
  }
}
