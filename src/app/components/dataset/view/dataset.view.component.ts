import { Component } from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {SecureComponent} from "../../../services/secure.component";
import {APIService} from "../../../services/api.service";
import {Response} from "@angular/http";



@Component({
  selector: 'viewdataset',
  template: require('./dataset.view.component.html'),
  styles: [require('./dataset.view.component.css')],

})

export class ViewDatasetComponent extends SecureComponent {
  private dataset: Object = {};
  private id:number;
  private loaded: boolean = false;
  constructor(router:Router, protected client: APIService, private route: ActivatedRoute){
    super(router, client);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
  }

  ngOnInit():void{
    super.ngOnInit();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getAlgorithm();
    });
  }

  getAlgorithm(){
    this.client.getDatasetByIdWithGET(this.id).subscribe((res:Response)=>{
      this.dataset = JSON.parse(res.text());
      this.loaded = true;

    },(err)=>{
      this.hasError = true;
      this.errorMessage = err.json()['message'];
    })
  }

}

