import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from "rxjs/Rx";
import { Router } from '@angular/router';

import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

//3rd party
import _ from 'lodash';


declare var gapi: any;

@Injectable()
export class UserService {

    public user: BehaviorSubject<any> = new BehaviorSubject({});
    private ACCOUNT_API_URL_BASE: string = "/account";
    private blizzardAccessToken: string;
    private blizzardAccessTokenStorageItem: 'blizzardAccessToken';
    constructor(
        private apiService: ApiService,
        private http: Http,
        private router: Router) {


    }

    getBlizzardProfile() {
        let accountURI = "https://us.api.battle.net/account/user?access_token=" + this.blizzardAccessToken;

        return this.apiService.get(accountURI);
    }

    getBlizzardAccessToken(code) {

        return this.apiService.post('/oauth/getblizzardaccesstoken', {code: code})
            .map(
                (accesstoken) => {
                    console.log(accesstoken);
                    this.blizzardAccessToken = accesstoken;
                    localStorage.setItem(this.blizzardAccessTokenStorageItem, accesstoken);
                    
                    return true;
                }
            )



        // return this.http.post(accessTokenURI, body, {headers: headers})
        //     .map(
        //     (accessToken) => {
        //         let parseAccessToken = accessToken.json();
        //         console.log(accessToken);
        //         // this.blizzardAccessToken = accessToken;
        //         return true;
        //     }
        //     )
    }

    isLoggedIn() {
        let user = this.user.getValue();
        let isLoggedIn = true;

        let blizzardAccess = localStorage.getItem(this.blizzardAccessTokenStorageItem);        

        if (user.name == "" || user.name == undefined || blizzardAccess) {
            isLoggedIn = false;
        }

        return isLoggedIn;

    }

    changePassword(body) {
        return this.apiService.post(this.ACCOUNT_API_URL_BASE + "/updateAccount", body);
    }

    getUserPromise() {
        return this.apiService.get(this.ACCOUNT_API_URL_BASE + "/currentUser");
    }

    getGoogleUser(email) {
        return this.apiService.get(this.ACCOUNT_API_URL_BASE + "/googleUser/" + email);

    }

    signUp(user) {
        let body = {
            ...user
        }

        return this.apiService.post(this.ACCOUNT_API_URL_BASE + "/signup", body);
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
        if (this.user.getValue().googleId) {
            gapi.auth2.getAuthInstance().signOut();
        }
        this.apiService.post(this.ACCOUNT_API_URL_BASE + "/logout", {})
            .subscribe((response) => {
                console.log("Logged out successfully");
                this.user.next({});
            })
    }

    googleLogin(email) {
        let body = {
            email: email
        }
        return this.apiService.post(this.ACCOUNT_API_URL_BASE + "/googleLogin", body);
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

    hasGuild() {
        let user = this.user.getValue();
        let hasGuild = false;

        if (user.guild != undefined && user.guild.name != "" && user.guild.name != undefined) {
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
