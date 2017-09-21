import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from "rxjs/Rx";

import { ApiService } from './api.service';

//3rd party


@Injectable()
export class UserService {

  public user: Subject<any> = new Subject();
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

}
