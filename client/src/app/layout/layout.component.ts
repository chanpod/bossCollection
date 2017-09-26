import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

//3rd party


@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  inputs: ['sidenav'],
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  user: any = undefined;

  constructor(private userService: UserService) {

    userService.user.subscribe((user) => {
      this.updateBasedOnUser(user);
    })
  }

  ngOnInit() {
  }

  updateBasedOnUser(user: any) {

    this.user = user;
  }

  logout(){
    this.userService.logout();
  }

}
