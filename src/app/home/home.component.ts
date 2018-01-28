import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) {
    if(this.authService.getLoginStatus() == false) {
      this.router.navigate(['/']);
    }
   }
    
  ngOnInit() {
    this.authService.isAuthenticated().subscribe((response:Response)=>{
      if(response.status != 202) {
        this.authService.logOut();
        this.router.navigate(['/']);
      }
    });
  }

}
