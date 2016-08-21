import { Component } from "@angular/core";
import {Router} from "@angular/router";
import {SecureComponent} from "../../../../services/secure.component";
import {APIService} from "../../../../services/api.service";



@Component({
  selector: 'viewallalgorithms',
  template: require('./algorithm.view.all.component.html'),
  styles: [require('./algorithm.view.all.component.css')],

})

export class ViewAllAlgorithmsComponent extends SecureComponent {
  private algorithms: Array<Object>;
  constructor(router:Router, protected client: APIService){
    super(router, client);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
    this.getAllAlgorithms();
  }


  ngOnInit():void{
    super.ngOnInit();
  }

  getAllAlgorithms(){
    this.client.getAllAlgorithmsGET().subscribe((res)=>{
      this.algorithms = JSON.parse(res.text());
      console.log(this.algorithms);

    },(err)=>{
      this.hasError = true;
      this.errorMessage = err.json()['message'];
    })
  }

}

