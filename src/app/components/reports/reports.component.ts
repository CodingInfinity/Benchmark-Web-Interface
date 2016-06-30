import { Component } from '@angular/core';
import {SecureComponent} from "../../services/secure.component";
import {Router} from "@angular/router";
import { MaterializeDirective } from 'angular2-materialize';
import {Client} from "../../services/api.service";

@Component({
  selector: 'report',
  template: require('./reports.component.html'),
  directives: [MaterializeDirective]
})
export class ReportComponent extends SecureComponent {

  constructor(router:Router, client: Client) {
    super(router, client);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
  }
}
