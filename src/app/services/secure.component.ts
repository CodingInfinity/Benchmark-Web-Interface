import {Router, OnActivate, RouteSegment, RouteTree} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

export class SecureComponent implements OnActivate {

  protected authorities: string[] = [];

  constructor(protected router: Router, protected authenticationService: AuthenticationService) {

  }
  home() {
    this.router.navigate(['/home']);
  }
  
  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void{
    if (!this.authenticationService.authenticated()) {
      this.router.navigateByUrl('/login');
    } else if (!this.authenticationService.hasRoles(this.authorities)) {
      this.router.navigateByUrl('/accessDenied');
    }
  }
}
