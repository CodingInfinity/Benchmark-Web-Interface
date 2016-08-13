'use strict';

import { Component } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import '../../public/css/styles.css';
import { MaterializeDirective } from 'angular2-materialize';

import { LoginComponent } from './components/login/login.component';
import { ResetFinishComponent } from './components/account/reset/finish/reset.finish.component';
import { ResetRequestComponent } from './components/account/reset/request/reset.request.component';
import { RegisterAccountComponent } from './components/account/register/register.component';
import { HomeComponent} from "./components/home/home.component";
import { ReportComponent} from "./components/reports/reports.component";
import { ActivateAccountComponent} from "./components/account/activate/activate.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {ProfileComponent} from "./components/account/profile/profile.component";
import {UsersComponent} from "./components/users/users.component";
import {CreateComponent} from "./components/users/create/create.component";
import {CreateDatasetComponent} from "./components/dataset/create/createdataset.component";
import {UploadAlgorithmComponent} from "./components/algorithm/upload/algorithm.upload.component";
import {UploadDatasetComponent} from "./components/dataset/upload/dataset.upload.component";
import {ViewAllAlgorithmsComponent} from "./components/algorithm/view/all/algorithm.view.all.component";
import {ViewAllDatasetsComponent} from "./components/dataset/view/all/dataset.view.all.component";

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')],
  directives: [
    ROUTER_DIRECTIVES,
    MaterializeDirective
  ]
})
@Routes([
    { path: '/', component: HomeComponent},
    { path: '/home', component: HomeComponent},
    { path: '/login', component: LoginComponent },
    { path: '/logout', component: LogoutComponent },
    { path: '/activate/:key', component: ActivateAccountComponent },
    { path: '/register', component: RegisterAccountComponent },
    { path: '/reset', component: ResetRequestComponent },
    { path: '/reset_finish/:key', component: ResetFinishComponent },
    { path: '/report', component: ReportComponent },
    { path: '/profile', component: ProfileComponent },
    { path: '/users', component: UsersComponent },
    { path: '/create', component: CreateComponent },
    { path: '/create/dataset', component: CreateDatasetComponent },
    { path: '/upload/algorithm', component: UploadAlgorithmComponent },
    { path: '/upload/dataset', component: UploadDatasetComponent },
    { path: '/view/all/algorithms', component: ViewAllAlgorithmsComponent },
    { path: '/view/all/datasets', component: ViewAllDatasetsComponent },
])
export class AppComponent {
 constructor(private router: Router) {}

    ngOnInit() {
        //this.router.navigate(['/login']);
    }
}
