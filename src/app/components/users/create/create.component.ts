import { Component } from "@angular/core";
import {Router, RouteSegment, RouteTree} from "@angular/router";
import { MaterializeDirective } from "angular2-materialize";
import {NavigationComponent} from "../../navigation/navigation.component";
import {FooterComponent} from "../../footer/footer.component";
import {SecureComponent} from "../../../services/secure.component";
import {Client, CreateUnmanagedUserRequest} from "../../../services/api.service";
import {ControlGroup, FormBuilder, Validators} from "@angular/common";
import {ValidatorsOwn} from "../../validators.own";

@Component({
  selector: 'create',
  template: require('./create.component.html'),
  styles: [require('./create.component.css')],
  directives: [
    MaterializeDirective,
    NavigationComponent,
    FooterComponent
  ]
})

export class CreateComponent extends SecureComponent {

  private passwords: any;
  private form: ControlGroup;

  constructor(router:Router, protected client: Client, private fb: FormBuilder, private api: Client, private validators: ValidatorsOwn){
    super(router, client);
    this.authorities = ["ROLE_ADMIN"];
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      passwords: fb.group({
        password: ['', Validators.required],
        confirmPassword:  ['', Validators.required]
      },{validator: this.validators.matchingPasswords('password', 'confirmPassword')})
    });
    this.passwords =  this.form.controls['passwords'];
  }

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void{
    super.routerOnActivate(curr, prev, currTree, prevTree);
  }

  setPasswordClass() {
    if(this.passwords.controls['password'].value ==""){return;}
    return {
      invalid: !this.passwords.valid,
      valid: this.passwords.valid
    }
  }

  register(value: any){
    var user: CreateUnmanagedUserRequest = {
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName,
      password: value.passwords.password,
      username: value.username
    };

    this.api.registerAccountUsingPOST(user).subscribe(
      (response)=>{
        this.showMessage = true;
        this.hasError = false;
        this.message = "You have successfully registered a user! An email confirmation has been sent to " + user.email;
      },(err)=>{
        this.errorMessage = err.json()["message"];
        this.hasError = true;
        this.showMessage = false;
      });
  }
}
