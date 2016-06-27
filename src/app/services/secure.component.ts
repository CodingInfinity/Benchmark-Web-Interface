import {Router, OnActivate, RouteSegment, RouteTree} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {BaseComponent} from "../components/base.component";

export class SecureComponent extends BaseComponent implements OnActivate {

  protected authorities: string[] = [];

  constructor(protected router: Router) {
    super();
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
