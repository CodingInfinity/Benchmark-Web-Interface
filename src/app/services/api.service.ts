﻿import 'rxjs/Rx';
import {OpaqueToken, Injectable, Inject, Optional} from "@angular/core";
import {Http, Headers, URLSearchParams} from "@angular/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Rx";

export const API_BASE_URL = new OpaqueToken('API_BASE_URL');
export const JSON_PARSE_REVIVER = new OpaqueToken('JSON_PARSE_REVIVER');

@Injectable()
export class APIService {
  private router: Router = null;
  private baseUrl: string = undefined;
  private jsonParseReviver: (key: string, value: any) => any = undefined;

  constructor(private http: Http, @Inject(Router) router: Router, @Optional() @Inject(API_BASE_URL) baseUrl?: string, @Optional() @Inject(JSON_PARSE_REVIVER) jsonParseReviver?: (key: string, value: any) => any) {
    this.router = router;
    this.baseUrl = process.env.API_URL;
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

  /**
   * getAllAlgorithmCategories
   * @return OK
   */
  getAllAlgorithmCategoriesGET(): Observable<any>{
    var url = this.baseUrl + "/api/repo/category/algorithm/all";
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
   * getAllDatasetCategories
   * @return OK
   */
  getAllDatasetCategoriesGET(): Observable<any>{
    var url = this.baseUrl + "/api/repo/category/dataset/all";
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
   * createAlgorithmCategory
   * @request request
   * @return OK
   */
  createAlgorithmCategoryWithPOST(request:string): Observable<any>{
    var url = this.baseUrl + "/api/repo/category/algorithm/";
    var content = request;

    return this.http.request(url, {
      body: content,
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  /**
   * createDatasetCategory
   * @request request
   * @return OK
   */
  createDatasetCategoryWithPOST(request:string): Observable<any>{
    var url = this.baseUrl + "/api/repo/category/dataset/";
    var content= request;

    return this.http.request(url, {
      body: content,
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  getDatasetCategoryByIdWithGET(id:number): Observable<any>{
    var url = this.baseUrl + "/api/repo/category/dataset/";
    url += id;
    var content = "";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  getAlgorithmCategoryByIdWithGET(id:number): Observable<any>{
    var url = this.baseUrl + "/api/repo/category/algorithm/";
    url += id;
    var content = "";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  getAllDatasetsGET(): Observable<any>{
    var url = this.baseUrl + "/api/repo/datasets";
    var content = "";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  getUsersAlgorithmsGET(): Observable<any>{
    var url = this.baseUrl + "/api/repo/algorithm/user";
    var content = "";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  getUsersDatasetsGET(): Observable<any>{
    var url = this.baseUrl + "/api/repo/dataset/user";
    var content = "";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  getAllAlgorithmsGET(): Observable<any>{
    var url = this.baseUrl + "/api/repo/algorithms";
    var content = "";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  createExperimentWithPOST(request:string): Observable<any>{
    var url = this.baseUrl + "/api/experiment";
    var content = request;

    return this.http.request(url, {
      body: content,
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  getJobCSVWithGET(id:number): Observable<any>{
    var url = this.baseUrl + "/api/job/";
    url += id;
    url += "/results";

    var content = "";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  getAllExperimentsWithGET(): Observable<any>{
    var url = this.baseUrl + "/api/experiments";
    var content = "";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  getAllCurrentUserExperimentsWithGET(): Observable<any>{
    var url = this.baseUrl + "/api/experiments/user";
    var content = "";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  getExperimentByIdWithGET(id:number): Observable<any>{
    var url = this.baseUrl + "/api/experiment/";
    url += id;
    var content = "";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  isJobOnQueueWithGET(id:number): Observable<any>{
    var url = this.baseUrl + "/api/job/onQueue/";
    url += id;
    var content = "";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  getExperimentWeeklyReportWithGET(): Observable<any>{
    var url = this.baseUrl + "/api/experiments/report/weekly";
    var content = "";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  getAlgorithmByIdWithGET(id:number): Observable<any>{
    var url = this.baseUrl + "/api/repo/algorithm/" + id;
    var content = "";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  getDatasetByIdWithGET(id:number): Observable<any>{
    var url = this.baseUrl + "/api/repo/dataset/" + id;
    var content = "";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  deleteAlgorithmCategoryUsingDelete(id_cat:number) : Observable<any>
  {
    var url = this.baseUrl + "/api/repo/category/algorithm";

    var content : DeleteCategory ={
      id:id_cat,
    };


    return this.http.request(url, {
      body: content,
      method: "delete",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  deleteDatasetCategoryUsingDelete(id_cat:number) : Observable<any>
  {
    var url = this.baseUrl + "/api/repo/category/dataset";

    var content : DeleteCategory ={
      id:id_cat,
    };

    return this.http.request(url, {
      body: content,
      method: "delete",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  getAlgorithmContentWithGET(id:string){
    var url = this.baseUrl + "/api/repo/algorithm/content/";
    url += id;
    var content ="";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  getDatasetContentWithGET(id:string){
    var url = this.baseUrl + "/api/repo/dataset/content/";
    url += id;
    var content ="";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  getNodeSumaryWithGET():Observable<any>{
    var url = this.baseUrl + "/api/nodes";
    var content ="";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  getNodeByIdWithGet(id:string):Observable<any>{
    var url = this.baseUrl + "/api/node/";
    url+=id
    var content ="";

    return this.http.request(url, {
      body: content,
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  deleteNodeByIdWithDelete(id:string):Observable<any>{
    var url = this.baseUrl + "/api/node/";
    url+=id
    var content ="";

    return this.http.request(url, {
      body: content,
      method: "delete",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    });
  }

  getCompareExperimentsWithGET(id:number):Observable<any>{
    var url = this.baseUrl + "/api/experiments/compare/";
    url+=id
    var content ="";

    return this.http.request(url, {
      body: content,
      method: "get",
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

    return this.http.post(this.baseUrl + '/oauth/token', body.toString(), {headers: headers});

  }

  refresh(){
    var refreshToken = JSON.parse(localStorage.getItem('token'))['refresh_token'];

    let headers: Headers = new Headers();
    let body: URLSearchParams = new URLSearchParams();

    headers.append('Authorization', 'Basic YWNtZTphY21lc2VjcmV0');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    body.append('grant_type', 'refresh_token');
    body.append('refresh_token', refreshToken);

    this.http.post(this.baseUrl + '/oauth/token', body.toString(), {headers: headers}).subscribe(
      (res)=>{
        localStorage.setItem('token', JSON.stringify(res.json()));

        var expiresIn = Number.parseFloat(res.json()["expires_in"]);
        var dateNow = Date.now();
        var expiryDate = dateNow + (expiresIn * 1000);

        localStorage.setItem('token_expires', expiryDate.toString());
      },(err)=>{
        this.router.navigate(['/logout']);
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_token');
    localStorage.removeItem('token_expires');

    this.http.get(this.baseUrl + '/api/logout');
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

export interface DeleteCategory{
  id: number;
}

export interface CreateCategory{
  name:string;
}
