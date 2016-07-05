import {Router, OnActivate, RouteSegment, RouteTree} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {BaseComponent} from "../components/base.component";
import {Client} from "./api.service";

export class SecureComponent extends BaseComponent implements OnActivate {

  protected authorities: string[] = [];

  constructor(protected router: Router, protected client: Client) {
    super();
  }
  home() {
    this.router.navigate(['/']);
  }

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void{
    if (!this.client.authenticated()) {
      this.router.navigateByUrl('/login');
    } else if (!this.client.hasRoles(this.authorities)) {
      this.router.navigateByUrl('/');
    }
  }
}
