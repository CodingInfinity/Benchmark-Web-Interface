import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'

import {Http, Response} from "@angular/http";
import {APIService} from "../../services/api.service";
import {BaseComponent} from "../base.component";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";


@Component({
    selector: 'login',
    template: require('./login.component.html'),
})
export class LoginComponent extends BaseComponent implements OnInit {

  private form: FormGroup;

  constructor(private router: Router, private client: APIService, private fb: FormBuilder) {
    super();
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register() {
      this.router.navigate(['/register']);
  }

  login(value: any) {
    this.client.authenticate(value.username, value.password).subscribe((res:Response) => {
      localStorage.setItem('token', JSON.stringify(res.json()));

      var expiresIn = Number.parseFloat(res.json()["expires_in"]);
      var dateNow = Date.now();
      var expiryDate = dateNow + (expiresIn * 1000);

      localStorage.setItem('token_expires', expiryDate.toString());


      //When logged in, get the user_token
      this.client.getAccountUsingGET().subscribe((response)=>{
        localStorage.setItem('user_token', JSON.stringify(response.json()));
        this.hasError = false;
        this.router.navigate(['/home']);
      },(err)=>{
        this.errorMessage = err.json()["message"];
        this.hasError = true;
        this.client.logout();
      });

    },(err)=>{
      this.errorMessage = err.json()["error_description"];
      this.hasError = true;
    });
  }

  ngOnInit(){
    if(this.client.authenticated()){
      this.router.navigate(['/home']);
    }
  }
}
