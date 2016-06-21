import { Component } from '@angular/core';
import {SecureComponent} from "../../services/secure.component";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import { MaterializeDirective } from 'angular2-materialize';

@Component({
  selector: 'report',
  template: require('./reports.component.html'),
  directives: [MaterializeDirective]
})
export class ReportComponent extends SecureComponent {

  constructor(router:Router, authenticationService:AuthenticationService) {
    super(router, authenticationService);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
  }
}
