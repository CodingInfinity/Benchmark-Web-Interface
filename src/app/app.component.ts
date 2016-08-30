
import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')],
})

export class AppComponent {
  constructor(router:Router){}

}
