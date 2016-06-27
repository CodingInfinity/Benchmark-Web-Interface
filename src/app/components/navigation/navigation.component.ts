import { Component } from "@angular/core";
import { MaterializeDirective } from "angular2-materialize/dist/index";
import { Router, ROUTER_DIRECTIVES } from "@angular/router";

@Component({
  selector: "navigation",
  template: require('./navigation.component.html'),
  styles: [require('./navigation.component.css')],
  directives: [
    MaterializeDirective, 
    ROUTER_DIRECTIVES
  ],
})
export class NavigationComponent {
  
}