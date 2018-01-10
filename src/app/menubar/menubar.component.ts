import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../Beans/User';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  allMenuItems: MenuItem[] = [{name:'Home',link:'home'},
    {name:'Profile', link: 'profile'}];
  
    user:User;
  constructor(private userService: UserService) {
    this.getUser();
   }

  ngOnInit() { }

  getUser(): void {
    this.userService.getUsers().subscribe(users=>{
      console.log("out:" ,users)
      this.user = users[0]});
  }
}


class MenuItem {
  name: string;
  link: string;
}