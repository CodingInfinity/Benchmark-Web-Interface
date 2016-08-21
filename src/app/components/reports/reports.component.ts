import { Component } from '@angular/core';
import {SecureComponent} from "../../services/secure.component";
import {Router} from "@angular/router";
import {APIService} from "../../services/api.service";

@Component({
  selector: 'report',
  template: require('./reports.component.html'),
})
export class ReportComponent extends SecureComponent {

  constructor(router:Router, client: APIService) {
    super(router, client);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
  }
}
