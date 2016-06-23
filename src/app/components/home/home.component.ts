import { Component } from '@angular/core';
import {SecureComponent} from "../../services/secure.component";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import { MaterializeDirective } from 'angular2-materialize';


@Component({
  selector: 'home',
  template: require('./home.component.html'),
  directives: [MaterializeDirective]
})
export class HomeComponent extends SecureComponent {

    constructor(router:Router, authenticationService:AuthenticationService) {
      super(router, authenticationService);
      this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
    }

    logout(){
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }
}
