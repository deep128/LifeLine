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
  
  usernameAlert = {
    show: false,
    msg: "",
    style: ""
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
