import { provide } from "@angular/core";
import {beforeEachProviders, inject, injectAsync} from "@angular/core/testing";
import {
  BaseRequestOptions, RequestOptions, Http, XHRBackend, ResponseOptions, Response,
  HTTP_PROVIDERS
} from "@angular/http";
import {MockBackend, MockConnection} from "@angular/http/testing";

import { AuthenticationService } from "./authentication.service";
import {Client} from "./api.service";
import {Router} from "@angular/router";

describe('Authentication Service', () => {
  /*
  let mockbackend : MockBackend, client: Client;


  beforeEachProviders(() =>
    [
      HTTP_PROVIDERS,
      Client
    ]
  );



  beforeEach(inject([Client], (_client: Client) => {
    this.client = _client;
  }));


  it ('token should be set in local storage for successful login',
    //inject([XHRBackend], (mockbackend: MockBackend) => {
    ()=>{

      expect(AuthenticationService.authenticatedAndIsTokenExpired()).toBeFalsy();

      //Mocking the backend
      /*mockbackend.connections.subscribe(
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

      client.authenticate('user','password');
      */
  /*
      var token =
        "{'access_token': '449645f7-feaa-4eb3-b49b-ca6cc6809833'," +
        "'token_type': 'bearer'," +
        "'refresh_token': '0b8b2563-91b8-46fb-b7ba-c0364f5557b6'," +
        "'expires_in': 252," +
        "'scope': 'read write'}";

      localStorage.setItem('token', token);

      expect(AuthenticationService.authenticatedAndIsTokenExpired()).toBeTruthy();

  });

  it ('should remove token from local storage upon logout', () => {
    localStorage.setItem('token','testdata');
    client.logout();
    expect(!!localStorage.getItem('token')).toBeFalsy();
  });

  it ('should not be authenticated after logout', () => {
    localStorage.setItem('token','testdata');
    client.logout();
    expect(AuthenticationService.authenticatedAndIsTokenExpired()).toBeFalsy();
  });

  it('user has access to this route', () =>{
    let user_token: string = '{"username": "fabio","firstName": "Fabio","lastName": "Loreggian","email": "admin@localhost","activated": true,"langKey": "en", "authorities": ["ROLE_USER","ROLE_ADMIN"]}';
    localStorage.setItem("user_token", user_token);
    expect(client.hasRoles(['ROLE_USER, ROLE_ADMIN'])).toBeTruthy();
  });

  it('user has denied access to this route', () =>{
    let user_token: string = '{"username": "fabio","firstName": "Fabio","lastName": "Loreggian","email": "admin@localhost","activated": true,"langKey": "en", "authorities": ["ROLE_USER"]}';
    localStorage.setItem("user_token", user_token);
    expect(client.hasRoles(['ROLE_ADMIN'])).toBeFalsy();
  });

  it('user hasnt logged in, therefore has no access to the route', () =>{
    expect(client.hasRoles(['ROLE_ADMIN'])).toBeFalsy();
  });
  */
});
