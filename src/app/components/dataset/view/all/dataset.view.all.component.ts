import { Component } from "@angular/core";
import {Router} from "@angular/router";
import {SecureComponent} from "../../../../services/secure.component";
import {APIService} from "../../../../services/api.service";



@Component({
  selector: 'viewalldatasets',
  template: require('./dataset.view.all.component.html'),
  styles: [require('./dataset.view.all.component.css')],
})

export class ViewAllDatasetsComponent extends SecureComponent {
  private datasets: Array<Object>;
  constructor(router:Router, protected client: APIService){
    super(router, client);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
    this.getAllDatasets();

  }


  ngOnInit():void{
    super.ngOnInit();
  }

  getAllDatasets(){
    this.client.getAllDatasetsGET().subscribe((res)=>{
      this.datasets = JSON.parse(res.text());

    },(err)=>{
      this.hasError = true;
      this.errorMessage = err.json()['message'];
    })
  }

}

