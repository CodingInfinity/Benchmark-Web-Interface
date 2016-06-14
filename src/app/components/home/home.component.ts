import { Component } from '@angular/core';
import {SecureComponent} from "../../services/secure.component";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";


@Component({
  selector: 'home',
  template: require('./home.component.html'),
})
export class HomeComponent extends SecureComponent {
  
    constructor(router:Router, authenticationService:AuthenticationService) {
      super(router, authenticationService);
    }
}
