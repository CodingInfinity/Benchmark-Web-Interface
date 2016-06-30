import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MaterializeDirective } from "angular2-materialize";

import { Client } from "../../services/api.service";
import { SecureComponent } from "../../services/secure.component";

import { NavigationComponent } from "../navigation/navigation.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'home',
  template: require('./home.component.html'),
  styles: [require('./home.component.css')],
  directives: [
    MaterializeDirective,
    NavigationComponent,
    FooterComponent
  ]
})
export class HomeComponent extends SecureComponent {

    constructor(router:Router, protected client: Client) {
      super(router, client);
      this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
    }
}
