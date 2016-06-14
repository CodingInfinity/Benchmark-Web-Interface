import {Router, OnActivate, RouteSegment, RouteTree} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

export class SecureComponent implements OnActivate {

  private authorities: string[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService) {

  }

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void{
    if (!this.authenticationService.authenticated()) {
      this.router.navigateByUrl('/login');
    } else if (!this.authenticationService.hasRoles(this.authorities)) {
      this.router.navigateByUrl('/accessDenied');
    }
  }
}
