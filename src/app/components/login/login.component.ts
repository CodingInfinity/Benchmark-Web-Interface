'use strict';

import { Component } from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router'

import {MaterializeDirective} from 'angular2-materialize';

@Component({
    selector: 'login',
    template: require('./login.component.html'),
    directives: [
      MaterializeDirective, 
      ROUTER_DIRECTIVES
    ]
})
export class LoginComponent {

    constructor(private router: Router) {}

    register() {
        this.router.navigate(['/register']);
    }
}
