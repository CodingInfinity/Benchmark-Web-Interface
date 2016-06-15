import {Injectable, provide} from "@angular/core";
import {URLSearchParams, Headers, Response, Http} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

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
        localStorage.setItem('token', JSON.stringify(res.json()));
      });
    return true;
  }

  logout() {
    localStorage.removeItem('token');
    return Observable.of(true);
  }

  authenticated() :boolean {
    return !!localStorage.getItem('token');
  }

  hasRole(auth: string): boolean {
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
