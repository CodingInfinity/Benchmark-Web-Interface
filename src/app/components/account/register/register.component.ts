
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'
import {APIService, CreateUnmanagedUserRequest} from "../../../services/api.service";
import {ValidatorService} from "../../validators.service";
import {BaseComponent} from "../../base.component";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {} from "@angular/common";

@Component({
    selector: 'registerAccount',
    template: require('./register.component.html'),
})
export class RegisterAccountComponent extends BaseComponent implements OnInit{
  private form: FormGroup;
  private passwords: any;

  constructor(private router: Router, private fb: FormBuilder, private api: APIService, private validators: ValidatorService) {
    super();
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
      this.message = "You have successfully registered! An email confirmation has been sent to " + user.email;
    },(err)=>{
      this.errorMessage = err.json()["message"];
      this.hasError = true;
      this.showMessage = false;
    });
  }

  ngOnInit(){
    if(this.api.authenticated()){
      this.router.navigate(['/home']);
    }
  }
}
