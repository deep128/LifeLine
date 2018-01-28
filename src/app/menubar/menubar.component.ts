import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../Beans/User';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  allMenuItems: MenuItem[] = [{name:'Home',link:'home'},
    {name:'Profile', link: 'profile'}];
  
    user:User;
    constructor(private userService: UserService, private authService:AuthService,private router: Router) {
    this.getUser();
   }

  ngOnInit() { }

  getUser(): void {
    this.userService.getCurrUser().subscribe(
      users=>{
        this.user = users[0]
      },
      (error)=>{
        console.log(error)
      });
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}


class MenuItem {
  name: string;
  link: string;
}