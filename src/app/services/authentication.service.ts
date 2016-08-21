import {Injectable} from "@angular/core";
import {
  URLSearchParams, Headers, Response, Http, RequestOptionsArgs, RequestMethod, Request,
  RequestOptions, ConnectionBackend, XHRBackend
} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthenticationService extends Http {

  constructor(backend:ConnectionBackend, defaultOptions:RequestOptions) {
    super(backend, defaultOptions);
  }

  static authenticatedAndIsNotTokenExpired() :boolean {

    if(!localStorage.getItem('token')){
      return false;
    }
    var dateNow = Date.now();
    var expiryDate = Number.parseFloat(localStorage.getItem('token_expires'));
    if(dateNow > expiryDate){
      return false;
    }
    return true;
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    console.log("Called get");
    return this._request(RequestMethod.Get, url, null, options);
  }
  public post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(RequestMethod.Post, url, body, options);
  }

  public super_post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.post(url, body, options);
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

    if (AuthenticationService.authenticatedAndIsNotTokenExpired()) {
      options.headers.set("Authorization", "Bearer " + JSON.parse(localStorage.getItem('token'))['access_token']);
    }

    return super.request(url, options);
  }
}

