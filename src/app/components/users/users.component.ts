import { Component } from "@angular/core";
import {Router, RouteSegment, RouteTree} from "@angular/router";
import { MaterializeDirective } from "angular2-materialize";
import {NavigationComponent} from "../navigation/navigation.component";
import {FooterComponent} from "../footer/footer.component";
import {SecureComponent} from "../../services/secure.component";
import {APIService} from "../../services/api.service";

@Component({
  selector: 'users',
   template: require('./users.component.html'),
   styles: [require('./users.component.css')],
   directives: [
      MaterializeDirective,
      NavigationComponent,
      FooterComponent
    ]
  })
export class UsersComponent extends SecureComponent {
  private users: any;
  private filteredUsers: any = this.users;
  constructor(router:Router, protected client: APIService) {
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
      });
  }

  getAllUsers(){
    this.client.getAllUsersUsingGET().subscribe(
      (response)=>{
        this.users = response.json();
        this.filteredUsers = this.users;
        this.hasError = false;
      },
      (err)=>{
        console.log(err.json());
        this.errorMessage = err.json()["message"];
        this.hasError = true;
        this.showMessage = false;
      });
  }

  public onKeypress(searchText:string):any {
    this.filteredUsers = this.users;
    if (searchText=="") {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter((users:any) => {
        return users.firstName.toLowerCase().indexOf(searchText.toLowerCase()) != -1 ||
        users.login.toLowerCase().indexOf(searchText.toLowerCase()) != -1 ||
        users.lastName.toLowerCase().indexOf(searchText.toLowerCase()) != -1 ||
        users.email.toLowerCase().indexOf(searchText.toLowerCase()) != -1;
      });
    }
  }
}
