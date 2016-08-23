import {Component, OnInit} from "@angular/core";
import {APIService} from "../../services/api.service";

@Component({
  selector: "navigation",
  template: require('./navigation.component.html'),
  styles: [require('./navigation.component.css')],
  inputs:["heading"]
})
export class NavigationComponent implements OnInit{
  private isAdmin: boolean = false;
  private loggedIn: boolean = false;
  private username: string = "";
  constructor(private client: APIService, private api: APIService){
    this.isAdmin = this.client.hasRole("ROLE_ADMIN");
  }

  ngOnInit(){
    console.log("Hello");
    this.loggedIn = this.api.authenticated();
    console.log(this.loggedIn);
    if(this.loggedIn){
      this.username = JSON.parse(localStorage.getItem("user_token"))["username"];
      console.log(this.username);
    }
  }
}
