import { Component } from "@angular/core";
import {Router} from "@angular/router";
import {SecureComponent} from "../../../services/secure.component";
import {APIService, CreateManagedUserRequest} from "../../../services/api.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'create',
  template: require('./create.component.html'),
  styles: [require('./create.component.css')],
})

export class CreateComponent extends SecureComponent {
  private form: FormGroup;
  private roles: Array<string> = [];

  constructor(router:Router, protected client: APIService, private fb: FormBuilder, private api: APIService){
    super(router, client);
    this.authorities = ["ROLE_ADMIN"];
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required]
    });

  }
  

  register(value: any){
    var user: CreateManagedUserRequest ={
      authorities: this.roles,
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName,
      username: value.username
    };

    this.api.createUserUsingPOST(user).subscribe(
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

  roleChange(value:any){
    for(var option of value.target){
      if(option.selected && !option.disabled){
        if(!this.roles.includes(option.value)){
          this.roles.push(option.value);
        }
      }else if(!option.selected && !option.disabled){
        if(this.roles.includes(option.value)){
          var index = this.roles.indexOf(option.value)
          this.roles.splice(index,1);
        }
      }
    }
  }
}
