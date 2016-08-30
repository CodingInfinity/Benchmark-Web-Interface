import { Component } from "@angular/core";
import {Router} from "@angular/router";
import {SecureComponent} from "../../../../services/secure.component";
import {APIService} from "../../../../services/api.service";



@Component({
  selector: 'viewuserdatasets',
  template: require('./dataset.view.user.component.html'),
  styles: [require('./dataset.view.user.component.css')],

})

export class ViewUsersDatasetsComponent extends SecureComponent {
  private datasets: Array<Object>;
  constructor(router:Router, protected client: APIService){
    super(router, client);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
    this.getUserDatasets();
  }


  ngOnInit():void{
    super.ngOnInit();
  }

  getUserDatasets(){
    this.client.getUsersDatasetsGET().subscribe((res)=>{
      this.datasets = JSON.parse(res.text());

    },(err)=>{
      this.hasError = true;
      this.errorMessage = err.json();
    })
  }

}

