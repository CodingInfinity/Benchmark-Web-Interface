import { Component } from "@angular/core";
import {Router} from "@angular/router";
import {SecureComponent} from "../../../services/secure.component";
import {APIService} from "../../../services/api.service";

@Component({
  selector: 'datasetCategories',
  template: require('./datasetcategories.component.html'),
  styles: [require('./datasetcategories.component.css')],
})
export class DatasetCategoriesComponent extends SecureComponent {
  private categories: any;
  private searchText:string;
  private filteredCategories: any = this.categories;
  constructor(router:Router, protected client: APIService) {
    super(router, client);
    this.authorities = ["ROLE_ADMIN"];
  }

  ngOnInit()
  {
    super.ngOnInit();
    this.getAllCategories();
  }


  deleteCategory(category:any)
  {
    this.client.deleteDatasetCategoryUsingDelete(category.id).subscribe(
      (response)=>{
        this.hasError = false;
        this.showMessage = true;
        this.message = category.name + " has been successfully deleted!";
        this.getAllCategories();
      },
      (err)=>{
        this.errorMessage = err.json()["message"];
        this.hasError = true;
        this.showMessage = false;
      });
  }

  getAllCategories(){
    this.client.getAllDatasetCategoriesGET().subscribe(
      (response)=>{
        this.categories = response.json();
        this.filteredCategories = this.categories;
        this.hasError = false;
      },
      (err)=>{
        this.errorMessage = err.json()["message"];
        this.hasError = true;
        this.showMessage = false;
      });
  }


  onKeypress(searchText:string):any {
    this.filteredCategories = this.categories;
    if (searchText=="") {
      this.filteredCategories = this.categories;
    } else {
      this.filteredCategories = this.categories.filter((categories:any) => {
        return categories.name.toLowerCase().indexOf(searchText.toLowerCase()) != -1;
      });
    }
  }

  viewDatasetCategory(category:any){
    this.router.navigate(['/view/category/datasets/'+category.id]);
  }
}
