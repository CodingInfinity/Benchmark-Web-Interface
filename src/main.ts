import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HTTP_PROVIDERS } from "@angular/http";
import { AUTH_PROVIDERS} from "./app/services/authentication.service";
import { APIService} from "./app/services/api.service";
import { ValidatorsOwn} from "./app/components/validators.own";
import { FileUploadService} from "./app/services/file.upload.service";


if (process.env.ENV === 'production') {
  enableProdMode();
}
bootstrap(AppComponent,  [ROUTER_PROVIDERS, HTTP_PROVIDERS, AUTH_PROVIDERS, APIService, ValidatorsOwn, FileUploadService]);
