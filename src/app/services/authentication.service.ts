import {Injectable, provide} from "@angular/core";
import {
  URLSearchParams, Headers, Response, Http, RequestOptionsArgs, RequestMethod, Request,
  RequestOptions, ConnectionBackend, XHRBackend
} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Client} from "./api.service";
import {Router} from "@angular/router";
import {AuthHttp} from "./AuthHttp";

@Injectable()
export class AuthenticationService extends Http {

  constructor(backend:ConnectionBackend, defaultOptions:RequestOptions, private router: Router) {
    super(backend, defaultOptions);
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_token');
  }

  static authenticated() :boolean {
    return !!localStorage.getItem('token');
  }

  static hasRole(auth: string): boolean {
    if(!localStorage.getItem('user_token')){
      return false;
    }
    let userRoles: string[] = JSON.parse(localStorage.getItem('user_token'))["authorities"];
    for(let role in userRoles){
      if(auth.localeCompare(role)){
        return true;
      }
    }
    return false;
  }

  static hasRoles(authorities: string[]): boolean {
    for (let auth in authorities) {
      if(this.hasRole(auth) == true){
        return true;
      }
    }
    return false;
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Get, url, null, options);
  }
  public post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Post, url, body, options);
  }
  public put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Put, url, body, options);
  }
  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Delete, url, null, options);
  }
  public patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Patch, url, body, options);
  }
  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Head, url, null, options);
  }

  public request(url:string|Request, options?:RequestOptionsArgs):Observable<Response> {
    return this.__request(url, options);
  }

  private _request(method: RequestMethod, url: string, body?: string, options?: RequestOptionsArgs): Observable<Response> {
    let requestOptions = new RequestOptions(Object.assign({
      method: method,
      url: url,
      body: body
    }, options));

    return this.__request(url, requestOptions);
  }

  private __request(url:string|Request, options?:RequestOptionsArgs): Observable<Response> {
    if (!options.headers) {
      options.headers = new Headers();
    }

    if (AuthenticationService.authenticated()) {
      options.headers.set("Authorization", "Bearer " + JSON.parse(localStorage.getItem('token'))['access_token']);
    }

    return super.request(url, options);
  }
}

export const AUTH_PROVIDERS: any = [
  provide(Http, {
    useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router) =>
      new AuthenticationService(xhrBackend, requestOptions, router),
    deps: [XHRBackend, RequestOptions, Router]
  })
];
