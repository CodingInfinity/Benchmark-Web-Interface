import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HTTP_PROVIDERS } from "@angular/http";
import {AUTH_PROVIDERS, AuthenticationService} from "./app/services/authentication.service";
import { Client} from "./app/services/api.service";
import { ValidatorsOwn} from "./app/components/validators.own";


if (process.env.ENV === 'production') {
  enableProdMode();
}
bootstrap(AppComponent,  [ROUTER_PROVIDERS, HTTP_PROVIDERS, AUTH_PROVIDERS, Client, ValidatorsOwn]);
