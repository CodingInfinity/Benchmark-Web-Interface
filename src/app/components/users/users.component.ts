import { Component } from "@angular/core";
import {Router, RouteSegment, RouteTree} from "@angular/router";
import { MaterializeDirective } from "angular2-materialize";
import {NavigationComponent} from "../navigation/navigation.component";
import {FooterComponent} from "../footer/footer.component";
import {SecureComponent} from "../../services/secure.component";
import {Client} from "../../services/api.service";
import {SearchPipe} from "../../Pipes/SearchPipe.pipe";

@Component({
  selector: 'users',
   template: require('./users.component.html'),
   styles: [require('./users.component.css')],
   pipes: [SearchPipe],
   directives: [
      MaterializeDirective,
      NavigationComponent,
      FooterComponent
    ]
  })
export class UsersComponent extends SecureComponent {
  private users: any;
  constructor(router:Router, protected client: Client) {
    super(router, client);
    this.authorities = ["ROLE_ADMIN"];
  }

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
    super.routerOnActivate(curr, prev, currTree, prevTree);
    this.getAllUsers();
  }

  deleteUser(user:any){
    this.client.deleteUserUsingDELETE(user.login).subscribe(
      (response)=>{
        this.hasError = false;
        this.showMessage = true;
        this.message = user.firstName + " " + user.lastName + " has been successfully deleted!";
        this.getAllUsers();
      },
      (err)=>{
        console.log(err.json());
        this.errorMessage = err.json()["message"];
        this.hasError = true;
        this.showMessage = false;
      });;
  }

  getAllUsers(){
    this.client.getAllUsersUsingGET().subscribe(
      (response)=>{
        this.users = response.json();
        this.hasError = false;
      },
      (err)=>{
        console.log(err.json());
        this.errorMessage = err.json()["message"];
        this.hasError = true;
        this.showMessage = false;
      });;
  }
}
