import {Component, OnInit} from "@angular/core";
import { Router} from "@angular/router";

import { AuthenticationService } from "../../services/authentication.service";
import {APIService} from "../../services/api.service";

@Component({
  template: require('./logout.component.html'),
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private client: APIService) {
  }

  ngOnInit():void{
    this.client.logout();
    this.router.navigate(['/login']);
  }
}
