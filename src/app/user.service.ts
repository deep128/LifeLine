import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './Beans/User';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User> {
    return this.http.get<User>("");
  }

  getCurrUser(): Observable<User> {
    return this.http.get<User>("http://localhost:9090/LifeLine/webapi/users/my");
  }

}