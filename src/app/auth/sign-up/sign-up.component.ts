import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Config } from '../../config.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private http:Http, private config:Config) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const header = new Headers({'Content-Type':'application/json'});
    this.http.post(this.config.baseAPIUrl + 'api/signup',form.value,{headers: header}).subscribe((res:Response)=>{
      console.log(res.status);
    });
  }

}
