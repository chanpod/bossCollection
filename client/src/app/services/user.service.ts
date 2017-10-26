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

  constructor(private apiService: ApiService, private router: Router) {

    
  }

  isLoggedIn() {
    let user = this.user.getValue();
    let isLoggedIn = true;

    if (user.name == "" || user.name == undefined) {
      isLoggedIn = false;
    }

    return isLoggedIn;

  }

  changePassword(body) {
    return this.apiService.post(this.ACCOUNT_API_URL_BASE + "/updateAccount", body);
  }

  getUserPromise(){
    return this.apiService.get(this.ACCOUNT_API_URL_BASE + "/currentUser");
  }

  getUser() {
    this.apiService.get(this.ACCOUNT_API_URL_BASE + "/currentUser")
      .subscribe((user) => {
        
        this.user.next(user);
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

  hasGuild(){
    let user = this.user.getValue();
    let hasGuild = false;

    if(user.guild != undefined && user.guild.name != "" && user.guild.name != undefined){ 
      hasGuild = true; 
    }

    return hasGuild;
  }

  isGM() {
    let isValidGM = false;
    let user = this.user.getValue();

    if (this.hasGuild() && user.guild.name == this.getGuildContext()) { 

      user.guild.members.forEach((member, index) => {

        if (member.user == user.name) {
          isValidGM = member.GM; 
        }
      });

    }

    return isValidGM;
  }

  
  getGuildContext() {
    
    let hostname = window.location.hostname;

    let splitHostName = hostname.split(".");
    let guildContext = splitHostName[0];

    if (guildContext == "localhost") {
      guildContext = "test";
    }

    return guildContext;
  }

}
