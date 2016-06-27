import { Component } from "@angular/core";
import { Router, OnActivate, RouteTree, RouteSegment } from "@angular/router";

import { AuthenticationService } from "../../services/authentication.service";

@Component({
  template: require('./logout.component.html'),
})
export class LogoutComponent implements OnActivate {

  constructor(private router: Router) {
  }

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void{
    AuthenticationService.logout();
    this.router.navigate(['/login']);
  }
}
