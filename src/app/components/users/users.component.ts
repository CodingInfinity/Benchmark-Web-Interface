import { Component } from "@angular/core";
import {Router, RouteSegment, RouteTree} from "@angular/router";
import { MaterializeDirective } from "angular2-materialize";
import {NavigationComponent} from "../navigation/navigation.component";
import {FooterComponent} from "../footer/footer.component";
import {SecureComponent} from "../../services/secure.component";
import {Client} from "../../services/api.service";

@Component({
  selector: 'users',
   template: require('./users.component.html'),
   styles: [require('./users.component.css')],
   directives: [
      MaterializeDirective,
      NavigationComponent,
      FooterComponent
    ]
  })
export class UsersComponent extends SecureComponent {

  constructor(router:Router, protected client: Client) {
    super(router, client);
    this.authorities = ["ROLE_ADMIN"];
  }

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
    super.routerOnActivate(curr, prev, currTree, prevTree);
  }
}
