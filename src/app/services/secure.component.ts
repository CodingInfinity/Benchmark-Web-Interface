import {Router, OnActivate, RouteSegment, RouteTree} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

export class SecureComponent implements OnActivate {

  protected authorities: string[] = [];

  constructor(protected router: Router) {

  }
  home() {
    this.router.navigate(['/']);
  }

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void{
    if (!AuthenticationService.authenticated()) {
      this.router.navigateByUrl('/login');
    } else if (!AuthenticationService.hasRoles(this.authorities)) {
      this.router.navigateByUrl('/accessDenied');
    }
  }
}
