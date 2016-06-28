import { Component } from "@angular/core";
import {Router, RouteSegment, RouteTree} from "@angular/router";
import { MaterializeDirective } from "angular2-materialize";
import {NavigationComponent} from "../../navigation/navigation.component";
import {FooterComponent} from "../../footer/footer.component";
import {SecureComponent} from "../../../services/secure.component";
import {Client,UpdateUserRequest} from "../../../services/api.service";
import {ControlGroup, FormBuilder, Validators} from "@angular/common";



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

    private firstname: string;
    private lastname: string;
    private email: string;
    private nameChange: boolean = false;
    private emailChange: boolean = false;

    private nameForm: ControlGroup;
    private emailForm: ControlGroup;


    constructor(router:Router, protected client: Client, private fb: FormBuilder) {
      super(router, client);
      this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
      this.nameForm = fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
      });
      this.emailForm = fb.group({
        email: ['', Validators.required]
      });
    }

    routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void{
      super.routerOnActivate(curr, prev, currTree, prevTree);
      //Get the use profile from the server
      this.firstname =  JSON.parse(localStorage.getItem("user_token"))["firstName"];
      this.lastname =  JSON.parse(localStorage.getItem("user_token"))["lastName"];
      this.email =  JSON.parse(localStorage.getItem("user_token"))["email"];
    }

    editNameSelect(){
      this.nameChange = true;
      this.emailChange = false;
    }

    editEmailSelect(){
      this.nameChange = false;
      this.emailChange = true;
    }

    editName(value: any){
      this.nameChange = false;
      if(this.firstname != value.firstname){
        this.firstname = value.firstname;
      }

      if(this.lastname != value.lastname){
        this.lastname = value.lastname;
      }
      this.sendUpdateRequest();
    }

    editEmail(value:any){
      console.log(value);
      this.emailChange = false;
      if(this.email != value.email){
        this.email = value.email;
      }
      this.sendUpdateRequest();
    }

    sendUpdateRequest(){
      var updatedUser: UpdateUserRequest = {
        email: this.email,
        firstName: this.firstname,
        lastName: this.lastname
      }

      this.client.updateUserUsingPUT(updatedUser).subscribe(
        (response)=>{
          this.showMessage = true;
          this.hasError = false;
          this.message = "You have successfully edited your profile!";
        },
        (err)=>{
          console.log(err.json());
          this.errorMessage = err.json()["error_description"];
          this.hasError = true;
          this.showMessage = false;
        });
    }
}
