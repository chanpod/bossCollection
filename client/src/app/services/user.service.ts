import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from "rxjs/Rx";

import { ApiService } from './api.service';

//3rd party
import _ from 'lodash';

@Injectable()
export class UserService {

  public user: BehaviorSubject<any> = new BehaviorSubject({});
  private ACCOUNT_API_URL_BASE: string = "/account";

  constructor(private apiService: ApiService) {

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

    this.apiService.post(this.ACCOUNT_API_URL_BASE + "/login", body)
      .subscribe((response) => {

        this.getUser();
      })

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
