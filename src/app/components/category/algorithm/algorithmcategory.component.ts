import { Component } from "@angular/core";
import {Router, RouteSegment, RouteTree} from "@angular/router";
import { MaterializeDirective } from "angular2-materialize";
import {NavigationComponent} from "../../navigation/navigation.component";
import {FooterComponent} from "../../footer/footer.component";
import {SecureComponent} from "../../../services/secure.component";
import {APIService} from "../../../services/api.service";

@Component({
  selector: 'algorithmcategories',
  template: require('./algorithmcategory.component.html'),
  styles: [require('./algorithmcategory.component.css')],
  directives: [
    MaterializeDirective,
    NavigationComponent,
    FooterComponent
  ]
})

export class AlgorithmCategoriesComponent extends SecureComponent {
  private categories:any;
  private filteredCategories:any;

  constructor(router:Router, protected client:APIService) {
    super(router, client);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
  }

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
    super.routerOnActivate(curr, prev, currTree, prevTree);
  }

  getAllCategories(){
    this.client.getAllAlgorithmCategoriesUsingGET().subscribe(
      (response)=>{
        this.categories = response.json();
        this.filteredCategories = this.categories;
        this.hasError = false;
      },
      (err)=>{
        console.log(err.json());
        this.errorMessage = err.json()["message"];
        this.hasError = true;
        this.showMessage = false;
      });
  }
}
