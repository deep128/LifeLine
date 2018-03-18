import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Config } from '../../config.service';
import { Router } from '@angular/router';
import { DialogBoxDetail } from '../../ui-component/popup-message/DialogBoxDetail';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  dialogBoxDetail:DialogBoxDetail = new DialogBoxDetail;
  
   validationAlert = {
    usernameShow: false,
    usernameFunCallSet: false,
    usernameLastArg: "",
    emailShow: false,
    emailFunCallSet: false,
    emailLastArg: "",
    emailLength: 0,
    usernameLength:0
  }

  constructor(private http:Http, private router: Router, private config:Config, private authService:AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const header = new Headers({'Content-Type':'application/json'});
    this.http.post(this.config.baseAPIUrl + 'api/signup',form.value,{headers: header}).subscribe((res:Response)=>{
      if(res.status == 201) {
        
        this.authService.signInUser(form.value.username,form.value.password).subscribe((response:Response) => {
          this.authService.login(response.text() + "");
          this.authService.setJwtToken(response.text());
          this.router.navigate(['\home']);
        },(error)=>{
          this.dialogBoxDetail.openDialogBox("Unable to Sign In", error);
        });
        
      }
    });
  }


  validateUsername(username) {
    this.validationAlert.usernameLength = username.length;
    this.validationAlert.usernameShow = false;
    if(username.length > 0) {
      this.validationAlert.usernameLastArg = username;
      if(this.validationAlert.usernameFunCallSet == false) {
        this.validationAlert.usernameFunCallSet = true;
        setTimeout(()=>{
          this.checkUsernameAvailability(this.validationAlert.usernameLastArg);
          this.validationAlert.usernameFunCallSet = false;
        },3000);
      }
    }
  }

  validateEmail(email) {
    this.validationAlert.emailLength = email.length;
    this.validationAlert.usernameShow = false;
    if(email.length > 0) {
      this.validationAlert.emailLastArg = email;
      if(this.validationAlert.emailFunCallSet == false) {
        this.validationAlert.emailFunCallSet = true;
        setTimeout(()=>{
          this.checkEmailAvailability(this.validationAlert.emailLastArg);
          this.validationAlert.emailFunCallSet = false;
        },3000);
      }
    }
  }

  checkUsernameAvailability(username) {
    const header = new Headers({'Content-Type':'application/json'});
    const param = {
      username: username
    };

    this.http.get(this.config.baseAPIUrl + 'api/signup/check/username',{
      headers: header,
      params: param
    }).subscribe((res:Response)=>{
      if(res.status == 200) {
        if(res.json().status == "200") {
          if(this.validationAlert.usernameLength > 0)
            this.validationAlert.usernameShow = true;
        }
      }
    });
  }

  checkEmailAvailability(email) {
    const header = new Headers({'Content-Type':'application/json'});
    const param = {
      email: email
    };

    this.http.get(this.config.baseAPIUrl + 'api/signup/check/email',{
      headers: header,
      params: param
    }).subscribe((res:Response)=>{
      if(res.status == 200) {
        if(res.json().status == "200") {
          if(this.validationAlert.emailLength > 0)
            this.validationAlert.emailShow = true;
        }
      }
    });
  }

}