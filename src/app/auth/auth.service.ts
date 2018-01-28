import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { tokenName } from '@angular/compiler';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private jwtToken:string;
  readonly tokenName:string = "JWTToken";
  private loggedIn:boolean = false;

  constructor(private http: Http,private router:Router) { 
    let match = document.cookie.match(new RegExp(this.tokenName + '=[^;]+'));
    if(match) {
      this.setJwtToken(match[0].split("=")[1]);
      this.loggedIn = true;
    }
    else {
      this.loggedIn = false;
    }
   }

  signInUser(username: string, password: string):Observable<Response> {
    const authUrl = 'http://localhost:9090/LifeLine/webapi/authservice';
    const authorization:string = "Basic " + btoa(username + ":" + password);
    const header = new Headers({
      'Authorization': authorization,
      'Content-type' : 'application/json',
      'withCredentials': 'true'
    });
    return this.http.get(authUrl, {headers: header});
  }

  setJwtToken(token:string) {
    this.jwtToken = token;
  }

  isAuthenticated():Observable<Response> {
      const authUrl = 'http://localhost:9090/LifeLine/webapi/authservice/';
      return this.http.get(authUrl + this.jwtToken);
  }

  getToken():string {
    return this.jwtToken;
  }

  logOut() {
    document.cookie = this.tokenName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.loggedIn = false;
  }

  login(token:string) {
    document.cookie = this.tokenName + "=" + token + ";";
    this.loggedIn = true;
  }

  getLoginStatus():boolean {
    return this.loggedIn;
  }

}
