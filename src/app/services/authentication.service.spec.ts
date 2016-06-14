import { provide } from "@angular/core";
import {beforeEachProviders, inject, injectAsync} from "@angular/core/testing";
import {
  BaseRequestOptions, RequestOptions, Http, XHRBackend, ResponseOptions, Response,
  HTTP_PROVIDERS
} from "@angular/http";
import {MockBackend, MockConnection} from "@angular/http/testing";

import { AuthenticationService } from "./authentication.service";

describe('Authentication Service', () => {

  let mockbackend : MockBackend, service: AuthenticationService;

  beforeEachProviders(() => {
    return [
      HTTP_PROVIDERS,
      provide(XHRBackend, {useClass: MockBackend}),
      AuthenticationService
    ];
  });

  beforeEach(inject([AuthenticationService], (_service: AuthenticationService) => {
    service = _service;
  }));

  it ('token should be set in local storage for successful login',
    inject([XHRBackend, AuthenticationService], (mockbackend, service) => {

      expect(service.authenticated()).toBeFalsy();
      
      mockbackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: {
                'access_token': '449645f7-feaa-4eb3-b49b-ca6cc6809833',
                'token_type': 'bearer',
                'refresh_token': '0b8b2563-91b8-46fb-b7ba-c0364f5557b6',
                'expires_in': 252,
                'scope': 'read write'
              }
            })
          ))
        }
      );
      
      service.authenticate('user','password');

      expect(service.authenticated()).toBeTruthy();
      
  }));

  it ('should be defined', () => {
    expect(service).toBeDefined();
  });

  it ('should remove token from local storage upon logout', () => {
    localStorage.setItem('token','testdata');
    service.logout();
    expect(!!localStorage.getItem('token')).toBeFalsy();
  });

  it ('should not be authenticated after logout', () => {
    localStorage.setItem('token','testdata');
    service.logout();
    expect(service.authenticated()).toBeFalsy();
  });


});
