import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from "rxjs/Rx";
import { Router } from '@angular/router';

import { ApiService } from './api.service';

//3rd party
import _ from 'lodash';

@Injectable()
export class UserService {

  public user: BehaviorSubject<any> = new BehaviorSubject({});
  private ACCOUNT_API_URL_BASE: string = "/account";

  constructor(private apiService: ApiService, private router:Router) {

  }

  changePassword(body){
    return this.apiService.post(this.ACCOUNT_API_URL_BASE + "/updateAccount", body);
  }

  getUser() {
    this.apiService.get(this.ACCOUNT_API_URL_BASE + "/currentUser")
      .subscribe((response) => {
        console.log(response)
        this.user.next(response);
      },
      (error) => {
        console.log("API call failed");
        console.log(error);
        this.router.navigate(['/login']);
      })

  }

  logout() {
    this.apiService.post(this.ACCOUNT_API_URL_BASE + "/logout", {})
      .subscribe((response) => {
        console.log("Logged out successfully");
        this.user.next({});
      })
  }

  login(username, password) {

    let body = {
      name: username,
      password: password
    }

    return this.apiService.post(this.ACCOUNT_API_URL_BASE + "/login", body);
      

  }

  resetPassword(email) {

    let body = {
      email: email
    }

    return this.apiService.post(this.ACCOUNT_API_URL_BASE + '/lost-password', body);
  }

  isGM() {
    let isValidGM = false;
    let user = this.user.getValue();

    if (user.guild) {


      user.guild.members.forEach((member, index) => {

        if (member.user == user.name) {
          isValidGM = true;
        }
      });

    }

    return isValidGM;
  }

}
