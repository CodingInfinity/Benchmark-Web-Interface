import { Component } from "@angular/core";
import { MaterializeDirective } from "angular2-materialize/dist/index";
import { Router, ROUTER_DIRECTIVES } from "@angular/router";
import {SecureComponent} from "../../services/secure.component";
import {Client} from "../../services/api.service";

@Component({
  selector: "navigation",
  template: require('./navigation.component.html'),
  styles: [require('./navigation.component.css')],
  directives: [
    MaterializeDirective,
    ROUTER_DIRECTIVES
  ],
})
export class NavigationComponent{
  private isAdmin: boolean = false;
  constructor(private client: Client){
    this.isAdmin = this.client.hasRole("ROLE_ADMIN");
  }
}
