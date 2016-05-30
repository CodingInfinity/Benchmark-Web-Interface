'use strict';

import { Component } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';

@Component({
    selector: 'resetRequest',
    template: require('./reset.request.component.html'),
    directives: [MaterializeDirective]
})
export class ResetRequestComponent {

}
