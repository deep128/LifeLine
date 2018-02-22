import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './Beans/User';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Config } from './config.service';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private config: Config) { }

  getUsers(): Observable<User> {
    return this.http.get<User>("");
  }

  getCurrUser(): Observable<User> {
    return this.http.get<User>(this.config.baseAPIUrl + "api/users/my");
  }

}