'use strict';

import { Component } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';

@Component({
    selector: 'registerAccount',
    template: require('./register.component.html'),
    directives: [MaterializeDirective]
})
export class RegisterAccountComponent {

}
