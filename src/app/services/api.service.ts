﻿//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v3.10.6012.41312 (http://NSwag.org)
// </auto-generated>
//----------------------

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
    getAccountUsingGET(): Observable<Profile> {
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

export interface Profile {
    activated: boolean;
    authorities: string[];
    email: string;
    firstName: string;
    lastName: string;
    username: string;
}

export interface ChangePasswordRequest {
    password: string;
}
