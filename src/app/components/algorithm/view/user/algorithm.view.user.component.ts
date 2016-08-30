import { Component } from "@angular/core";
import {Router} from "@angular/router";
import {SecureComponent} from "../../../../services/secure.component";
import {APIService} from "../../../../services/api.service";



@Component({
  selector: 'viewuseralgorithms',
  template: require('./algorithm.view.user.component.html'),
  styles: [require('./algorithm.view.user.component.css')],

})

export class ViewUsersAlgorithmsComponent extends SecureComponent {
  private algorithms: Array<Object>;
  constructor(router:Router, protected client: APIService){
    super(router, client);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
    this.getUserAlgorithms();
  }

  ngOnInit():void{
    super.ngOnInit();
  }

  getUserAlgorithms(){
    this.client.getUsersAlgorithmsGET().subscribe((res)=>{
      this.algorithms = JSON.parse(res.text());

    },(err)=>{
      this.hasError = true;
      this.errorMessage = err.json()['message'];
    })
  }

}

