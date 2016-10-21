import { Component } from "@angular/core";
import {Router} from "@angular/router";
import {SecureComponent} from "../../../services/secure.component";
import {APIService, UpdateUserRequest, ChangePasswordRequest} from "../../../services/api.service";
import {ValidatorService} from "../../validators.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";



@Component({
  selector: 'profile',
  template: require('./profile.component.html'),
  styles: [require('./profile.component.css')],
})
export class ProfileComponent extends SecureComponent {

    private firstname: string;
    private lastname: string;
    private email: string;
    private nameChange: boolean = false;
    private emailChange: boolean = false;
    private passwordChange: boolean = false;

    private nameForm: FormGroup;
    private emailForm: FormGroup;
    private passwordForm: FormGroup;


    constructor(router:Router, protected client: APIService, private fb: FormBuilder, private validators: ValidatorService) {
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

    ngOnInit():void{
      super.ngOnInit();
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


      this.client.changePasswordUsingPOST(password).subscribe(
        (response)=>{
          this.showMessage = true;
          this.hasError = false;
          this.message = "You have successfully changed your password!";
        },
        (err)=>{
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
          this.errorMessage = err.json()["message"];
          this.hasError = true;
          this.showMessage = false;
          this.firstname =  JSON.parse(localStorage.getItem("user_token"))["firstName"];
          this.lastname =  JSON.parse(localStorage.getItem("user_token"))["lastName"];
          this.email =  JSON.parse(localStorage.getItem("user_token"))["email"];
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

