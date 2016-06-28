import { Component } from "@angular/core";
import {Router, RouteSegment, RouteTree} from "@angular/router";
import { MaterializeDirective } from "angular2-materialize";
import {NavigationComponent} from "../../navigation/navigation.component";
import {FooterComponent} from "../../footer/footer.component";
import {SecureComponent} from "../../../services/secure.component";
import {Client, UpdateUserRequest, ChangePasswordRequest} from "../../../services/api.service";
import {ControlGroup, FormBuilder, Validators} from "@angular/common";
import {ValidatorsOwn} from "../../validators.own";



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
    private passwordChange: boolean = false;

    private nameForm: ControlGroup;
    private emailForm: ControlGroup;
    private passwordForm: ControlGroup;


    constructor(router:Router, protected client: Client, private fb: FormBuilder, private validators: ValidatorsOwn) {
      super(router, client);
      this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
      this.nameForm = fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
      });
      this.emailForm = fb.group({
        email: ['', Validators.required]
      });
      this.passwordForm = fb.group({
        password: ['', Validators.required],
        confirmPassword:  ['', Validators.required]
      },{validator: this.validators.matchingPasswords('password', 'confirmPassword')});
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
      this.passwordChange = false;
    }

    editEmailSelect(){
      this.nameChange = false;
      this.emailChange = true;
      this.passwordChange = false;
    }

    editPasswordSelect(){
      this.nameChange =false;
      this.emailChange =false;
      this.passwordChange = true;
    }

    editName(value: any){
      console.log(value);
      this.nameChange = false;
      if(this.firstname != value.firstName && value.firstName){
        this.firstname = value.firstName;
      }

      if(this.lastname != value.lastName && value.lastName){
        this.lastname = value.lastName;
      }
      this.sendUpdateRequest();
    }

    editEmail(value:any){
      console.log(value);
      this.emailChange = false;
      if(this.email != value.email && value.email){
        this.email = value.email;
      }
      this.sendUpdateRequest();
    }

    editPassword(value:any){
      this.passwordChange = false;
      var password :ChangePasswordRequest = {
        password: value.password
      };

      console.log(password);

      this.client.changePasswordUsingPOST(password).subscribe(
        (response)=>{
          this.showMessage = true;
          this.hasError = false;
          this.message = "You have successfully changed your password!";
        },
        (err)=>{
          console.log(err.json());
          this.errorMessage = err.json()["message"];
          this.hasError = true;
          this.showMessage = false;
        });

    }

    sendUpdateRequest(){
      var updatedUser: UpdateUserRequest = {
        email: this.email,
        firstName: this.firstname,
        lastName: this.lastname
      };

      console.log(updatedUser);

      this.client.saveAccountUsingPOST(updatedUser).subscribe(
        (response)=>{
          this.showMessage = true;
          this.hasError = false;
          this.message = "You have successfully edited your profile!";

          this.client.getAccountUsingGET().subscribe((response)=>{
            localStorage.setItem('user_token', JSON.stringify(response.json()));
            this.hasError = false;
          },(err)=>{
            this.errorMessage = err.json()["message"];
            this.hasError = true;
            this.client.logout();
          });
        },
        (err)=>{
          console.log(err.json());
          this.errorMessage = err.json()["message"];
          this.hasError = true;
          this.showMessage = false;
        });
    }

    setPasswordClass(){
      if(this.passwordForm.controls['password'].value ==""){return;}
      return {
        invalid: !this.passwordForm.valid,
        valid: this.passwordForm.valid
      }
    }
  }

