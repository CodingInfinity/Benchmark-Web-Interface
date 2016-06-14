import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HTTP_PROVIDERS, Http } from "@angular/http";
import { AuthenticationService } from "./app/services/authentication.service";

if (process.env.ENV === 'production') {
  enableProdMode();
}
bootstrap(AppComponent,  [ROUTER_PROVIDERS, HTTP_PROVIDERS, AuthenticationService]);
