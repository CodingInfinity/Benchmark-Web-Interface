import { Component } from "@angular/core";
import {Router, RouteSegment, RouteTree} from "@angular/router";
import { MaterializeDirective } from "angular2-materialize";
import {NavigationComponent} from "../../navigation/navigation.component";
import {FooterComponent} from "../../footer/footer.component";
import {SecureComponent} from "../../../services/secure.component";
import {Client, CreateManagedUserRequest} from "../../../services/api.service";
import {ControlGroup, FormBuilder, Validators} from "@angular/common";

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
  private form: ControlGroup;
  private roles: Array<string> = [];

  constructor(router:Router, protected client: Client, private fb: FormBuilder, private api: Client){
    super(router, client);
    this.authorities = ["ROLE_ADMIN"];
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required]
    });

  }

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void{
    super.routerOnActivate(curr, prev, currTree, prevTree);
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
