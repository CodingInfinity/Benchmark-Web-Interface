import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Injectable, Inject, Optional, OpaqueToken} from '@angular/core';
import {Http, Headers, Response, RequestOptionsArgs} from '@angular/http';

export const API_BASE_URL = new OpaqueToken('API_BASE_URL');
export const JSON_PARSE_REVIVER = new OpaqueToken('JSON_PARSE_REVIVER');

@Injectable()
export class Client {
  private http: Http = null;
  private baseUrl: string = undefined;
  private jsonParseReviver: (key: string, value: any) => any = undefined;

  constructor(@Inject(Http) http: Http, @Optional() @Inject(API_BASE_URL) baseUrl?: string, @Optional() @Inject(JSON_PARSE_REVIVER) jsonParseReviver?: (key: string, value: any) => any) {
    this.http = http;
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
