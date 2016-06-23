import { Component } from '@angular/core';
import {SecureComponent} from "../../services/secure.component";
import {Router} from "@angular/router";
import { MaterializeDirective } from 'angular2-materialize';
import {Client} from "../../services/api.service";
import {Response} from "@angular/http";
import {AuthenticationService} from "../../services/authentication.service";


@Component({
  selector: 'home',
  template: require('./home.component.html'),
  directives: [MaterializeDirective]
})
export class HomeComponent extends SecureComponent {

    constructor(router:Router, private client: Client) {
      super(router);
      this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
    }

    logout(){
      AuthenticationService.logout();
      this.router.navigate(['/login']);
    }
}
