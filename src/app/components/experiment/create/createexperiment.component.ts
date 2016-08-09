import { Component } from "@angular/core";
import {Router, RouteSegment, RouteTree} from "@angular/router";
import { MaterializeDirective } from "angular2-materialize";
import {NavigationComponent} from "../../navigation/navigation.component";
import {EditorComponent} from "../../tinymce/tinymce";
import {FooterComponent} from "../../footer/footer.component";
import {SecureComponent} from "../../../services/secure.component";
import {APIService} from "../../../services/api.service";
import {ControlGroup, FormBuilder, Validators} from "@angular/common";

@Component({
  selector: 'createexperiment',
  template: require('./createexperiment.component.html'),
  styles: [require('./createexperiment.component.css')],
  directives: [
    MaterializeDirective,
    NavigationComponent,
    FooterComponent,
    EditorComponent
  ]
})

export class CreateExperimentComponent extends SecureComponent {
  constructor(router:Router, protected client: APIService){

    super(router, client);
    this.authorities = ["ROLE_ADMIN", "ROLE_USER"];
  }

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void{
    super.routerOnActivate(curr, prev, currTree, prevTree);
  }
}
