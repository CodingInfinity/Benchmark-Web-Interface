import { Component } from "@angular/core";
import {Router, RouteSegment, RouteTree} from "@angular/router";
import { MaterializeDirective } from "angular2-materialize";
import {NavigationComponent} from "../../navigation/navigation.component";
import {FooterComponent} from "../../footer/footer.component";
import {SecureComponent} from "../../../services/secure.component";
import {Client} from "../../../services/api.service";



@Component({
  selector: 'profile',
  template: require('./profile.component.html'),
  styles: [require('./profile.component.css')],
  directives: [
    MaterializeDirective,
    NavigationComponent,
    FooterComponent
  ]
})
export class ProfileComponent extends SecureComponent {

    constructor(router:Router, private client: Client) {
      super(router);
      this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
    }

    routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void{
      super.routerOnActivate(curr, prev, currTree, prevTree);
      //Get the use profile from the server
      this.client.getAccountUsingGET().subscribe((response)=>{
        this.hasError =false;
        console.log(response);
      },(err)=>{
        console.log(err);
        this.errorMessage = err.json()["message"];
        this.hasError = true;
        this.showMessage = false;
      });
    }
}
