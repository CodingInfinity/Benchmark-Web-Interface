import { Component } from "@angular/core";
import {APIService} from "../../services/api.service";

@Component({
  selector: "navigation",
  template: require('./navigation.component.html'),
  styles: [require('./navigation.component.css')],
})
export class NavigationComponent{
  private isAdmin: boolean = false;
  constructor(private client: APIService){
    this.isAdmin = this.client.hasRole("ROLE_ADMIN");
  }
}
