import { Component } from "@angular/core";
import {Router} from "@angular/router";
import {SecureComponent} from "../../services/secure.component";
import {APIService} from "../../services/api.service";

@Component({
  selector: 'users',
   template: require('./users.component.html'),
   styles: [require('./users.component.css')],
  })
export class UsersComponent extends SecureComponent {
  private users: any;
  private searchText:string;
  private filteredUsers: any = this.users;
  constructor(router:Router, protected client: APIService) {
    super(router, client);
    this.authorities = ["ROLE_ADMIN"];
  }

  ngOnInit(){
    super.ngOnInit();
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
        this.errorMessage = err.json()["message"];
        this.hasError = true;
        this.showMessage = false;
      });
  }


  onKeypress(searchText:string):any {
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
