import {Router, ROUTER_PROVIDERS} from "@angular/router";

import { AppComponent } from './app.component';

describe('App', () => {
  let component: AppComponent;
  let router: Router;
  
  beforeAll(() => {
    router = jasmine.createSpyObj("Router", ['navigate']);
    component = new AppComponent(router);
  });
  
  it ('should be defined', () => {
    expect(component).toBeDefined();
  });
});