import { Component } from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Response} from "@angular/http";
import {SecureComponent} from "../../../../services/secure.component";
import {APIService} from "../../../../services/api.service";

@Component({
  selector: 'editdatasetcategory',
  template: require('./editdatasetcategory.component.html'),
  styles: [require('./editdatasetcategory.component.css')],

})

export class EditDatasetCategoryComponent extends SecureComponent {
  private category: any;
  private id: number;
  
  constructor(router:Router, protected client: APIService, private route: ActivatedRoute){

    super(router, client);
    this.authorities = ["ROLE_ADMIN"];
  }

  ngOnInit():void{
    super.ngOnInit();
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.id = id;
      this.getCategory();
    });
  }

  getCategory(){
    this.client.getDatasetCategoryByIdWithGET(this.id).subscribe((res:Response)=>{
      this.category = JSON.parse(res.text())['category'];
    },(err)=>{
      this.hasError = true;
      this.errorMessage = JSON.parse(err)['message'];
    });
  }

  editDatasetCategory(experiment:any)
  {
    
  }
}
