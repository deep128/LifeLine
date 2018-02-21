import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Config } from '../../config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  usernameAlert = {
    show: false,
    msg: "",
    style: ""
  }

  constructor(private http:Http, private router: Router, private config:Config) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const header = new Headers({'Content-Type':'application/json'});
    this.http.post(this.config.baseAPIUrl + 'api/signup',form.value,{headers: header}).subscribe((res:Response)=>{
      if(res.status == 200) {
        this.router.navigate(['/login']);
        alert("User created");
      }
    });
  }

  validateUsername(username) {
    if(username.length > 0) {
      const header = new Headers({'Content-Type':'application/json'});
      const param = {
        username: username
      };


      this.http.get(this.config.baseAPIUrl + 'api/signup/checkusername',{
        headers: header,
        params: param
      }).subscribe((res:Response)=>{
        if(res.status == 200) {
          if(res.json().status == "404") {
            this.usernameAlert.show = true;
            this.usernameAlert.msg = "Username is available";
            this.usernameAlert.style = "alert-success";
          }
          else {
            this.usernameAlert.show = true;
            this.usernameAlert.msg = "Username is not available, try something else";
            this.usernameAlert.style = "alert-danger";
          }
        }
      });
    }
    else {
      this.usernameAlert.show = false;
    }
  }

}
