import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Injectable, Inject, Optional, OpaqueToken} from '@angular/core';
import {Http, Headers, Response, RequestOptionsArgs, URLSearchParams} from '@angular/http';
import {Router} from "@angular/router";

export const API_BASE_URL = new OpaqueToken('API_BASE_URL');
export const JSON_PARSE_REVIVER = new OpaqueToken('JSON_PARSE_REVIVER');

@Injectable()
export class APIService {
  private http: Http = null;
  private router: Router = null;
  private baseUrl: string = undefined;
  private jsonParseReviver: (key: string, value: any) => any = undefined;

  constructor(@Inject(Http) http: Http, @Inject(Router) router: Router, @Optional() @Inject(API_BASE_URL) baseUrl?: string, @Optional() @Inject(JSON_PARSE_REVIVER) jsonParseReviver?: (key: string, value: any) => any) {
    this.http = http;
    this.router = router;
    this.baseUrl = baseUrl ? baseUrl : "http://localhost:8081";
    this.jsonParseReviver = jsonParseReviver;
  }

  /**
   * getAccount
   * @return OK
   */
  getAccountUsingGET(): Observable<any> {
    var url = this.baseUrl + "/api/account?";

    var content = "";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }


  /**
   * saveAccount
   * @request request
   * @return OK
   */
  saveAccountUsingPOST(request: UpdateUserRequest): Observable<any> {
    var url = this.baseUrl + "/api/account?";

    var content = JSON.stringify(request);

    return this.http.request(url, {
      body: content,
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  /**
   * changePassword
   * @request request
   * @return OK
   */
  changePasswordUsingPOST(request: ChangePasswordRequest): Observable<any> {
    var url = this.baseUrl + "/api/account/change_password?";

    var content = JSON.stringify(request);

    return this.http.request(url, {
      body: content,
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }


  /**
   * finishPasswordReset
   * @request request
   * @return OK
   */
  finishPasswordResetUsingPOST(request: CompletePasswordResetRequest): Observable<any> {
    var url = this.baseUrl + "/api/account/reset_password/finish?";

    var content = JSON.stringify(request);

    return this.http.request(url, {
      body: content,
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }


  /**
   * requestPasswordReset
   * @request request
   * @return OK
   */
  requestPasswordResetUsingPOST(request: RequestPasswordResetRequest): Observable<any> {
    var url = this.baseUrl + "/api/account/reset_password/init?";

    var content = JSON.stringify(request);

    return this.http.request(url, {
      body: content,
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  /**
   * activateAccount
   * @key key
   * @return OK
   */
  activateAccountUsingGET(key: string): Observable<any> {
    var url = this.baseUrl + "/api/activate?";

    if (key === undefined || key === null)
      throw new Error("The parameter 'key' must be defined.");
    else
      url += "key=" + encodeURIComponent("" + key) + "&";

    var content = "";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }



  /**
   * isAuthenticated
   * @return OK
   */
  isAuthenticatedUsingGET(): Observable<any> {
    var url = this.baseUrl + "/api/authenticate?";

    var content = "";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  /**
   * registerAccount
   * @request request
   * @return OK
   */
  registerAccountUsingPOST(request: CreateUnmanagedUserRequest): Observable<any> {
    var url = this.baseUrl + "/api/register?";

    var content = JSON.stringify(request);

    return this.http.request(url, {
      body: content,
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  /**
   * getAllUsers
   * @return OK
   */
  getAllUsersUsingGET(): Observable<any> {
    var url = this.baseUrl + "/api/users?";

    var content = "";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }



  /**
   * createUser
   * @request request
   * @return OK
   */
  createUserUsingPOST(request: CreateManagedUserRequest): Observable<any> {
    var url = this.baseUrl + "/api/users?";

    var content = JSON.stringify(request);

    return this.http.request(url, {
      body: content,
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }



  /**
   * updateUser
   * @request request
   * @return OK
   */
  updateUserUsingPUT(request: UpdateUserRequest): Observable<any> {
    var url = this.baseUrl + "/api/users?";

    var content = JSON.stringify(request);

    return this.http.request(url, {
      body: content,
      method: "put",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }



  /**
   * getUser
   * @login login
   * @return OK
   */
  getUserUsingGET(login: string): Observable<any> {
    var url = this.baseUrl + "/api/users/{login}?";

    if (login === undefined || login === null)
      throw new Error("The parameter 'login' must be defined.");
    url = url.replace("{login}", encodeURIComponent("" + login));

    var content = "";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }



  /**
   * deleteUser
   * @login login
   * @return OK
   */
  deleteUserUsingDELETE(login: string): Observable<any> {
    var url = this.baseUrl + "/api/users/{login}?";

    if (login === undefined || login === null)
      throw new Error("The parameter 'login' must be defined.");
    url = url.replace("{login}", encodeURIComponent("" + login));

    var content = "";

    return this.http.request(url, {
      body: content,
      method: "delete",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  authenticate(username: string, password: string): Observable<any> {

    let headers: Headers = new Headers();
    let body: URLSearchParams = new URLSearchParams();

    headers.append('Authorization', 'Basic YWNtZTphY21lc2VjcmV0');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    body.append('grant_type', 'password');
    body.append('username', username);
    body.append('password', password);
    body.append('scope', 'read write');

    return this.http.post('http://localhost:8081/oauth/token', body.toString(), {headers: headers});

  }

  refresh(){
    console.log("Calling refresh");
    var refreshToken = JSON.parse(localStorage.getItem('token'))['refresh_token'];
    console.log(refreshToken);

    let headers: Headers = new Headers();
    let body: URLSearchParams = new URLSearchParams();

    headers.append('Authorization', 'Basic YWNtZTphY21lc2VjcmV0');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    body.append('grant_type', 'refresh_token');
    body.append('refresh_token', refreshToken);

    this.http.post('http://localhost:8081/oauth/token', body.toString(), {headers: headers}).subscribe(
      (res)=>{
        localStorage.setItem('token', JSON.stringify(res.json()));

        var expiresIn = Number.parseFloat(res.json()["expires_in"]);
        console.log(expiresIn);
        var dateNow = Date.now();
        var expiryDate = dateNow + (expiresIn * 1000);

        localStorage.setItem('token_expires', expiryDate.toString());
      },(err)=>{
        console.log(err);
        this.router.navigate(['/logout']);
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_token');
    localStorage.removeItem('token_expires');
  }

  authenticated() :boolean {
    if(!localStorage.getItem('token')){
      return false;
    }
    var dateNow = Date.now();
    var expiryDate = Number.parseFloat(localStorage.getItem('token_expires'));
    if(dateNow > expiryDate){
      this.refresh();
    }
    return true;
  }

  hasRole(auth: string): boolean {
    if(!localStorage.getItem('user_token')){
      return false;
    }
    let userRoles: string[] = JSON.parse(localStorage.getItem('user_token'))["authorities"];
    for(var role of userRoles){
      if(auth == role){
        return true;
      }
    }
    return false;
  }

  hasRoles(authorities: string[]): boolean {
    for (let auth of authorities) {
      if(this.hasRole(auth) == true){
        return true;
      }
    }
    return false;
  } 
}


export interface RequestPasswordResetRequest {
  email: string;
}

export interface CompletePasswordResetRequest {
  key: string;
  newPassword: string;
}

export interface CreateUnmanagedUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
}

export interface UpdateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
}

export interface ChangePasswordRequest {
  password: string;
}

export interface CreateManagedUserRequest {
  authorities: string[];
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}
