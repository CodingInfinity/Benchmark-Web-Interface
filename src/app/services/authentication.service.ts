import {Injectable, provide} from "@angular/core";
import {URLSearchParams, Headers, Response, Http} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Client} from "./api.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {

  constructor(private http: Http, private api: Client, private router: Router) { }

  authenticate(username: string, password: string) {

    let headers: Headers = new Headers();
    let body: URLSearchParams = new URLSearchParams();

    headers.append('Authorization', 'Basic YWNtZTphY21lc2VjcmV0');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    body.append('grant_type', 'password');
    body.append('username', username);
    body.append('password', password);
    body.append('scope', 'read write');

    this.http.post('http://localhost:8081/oauth/token', body.toString(), {headers: headers})
    .subscribe((res:Response) => {
      console.log(res);
      localStorage.setItem('token', JSON.stringify(res.json()));

      //When logged in, get the user_token
      this.api.getUserUsingGET(username).subscribe((response)=>{
        console.log("Response here:");
        console.log(response);
        localStorage.setItem('user_token', JSON.stringify(response.json()));
        this.router.navigate(['/home']);
      },(err)=>{
        console.log("Exception Caught:");
        console.log(err);
        var message = err.json()["message"];
        console.log(message);
      });

    },(err)=>{
      var message = err.json()["error_description"];
      console.log(message);
    });


    return true;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_token');
  }

  authenticated() :boolean {
    return !!localStorage.getItem('token');
  }

  hasRole(auth: string): boolean {
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

  hasRoles(authorities: string[]): boolean {
    for (let auth in authorities) {
      if(this.hasRole(auth) == true){
        return true;
      }
    }
    return false;
  }
}
