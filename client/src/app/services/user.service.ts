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
    private blizzardAccess: any;
    public blizzardAccessTokenStorageItem: string = 'blizzardAccessToken';
    public blizzardProfileStorageItem: string = 'blizzardProfile';
    constructor(
        private apiService: ApiService,
        private http: Http,
        private router: Router) {


    }

    getBlizzardProfile() {
        let accountURI = "https://us.api.battle.net/account/user?access_token=" + this.blizzardAccess.access_token;

        return this.http.get(accountURI).map(res => res.json());
    }

    setBlizzardUser(user: any) {
        user.name = user.battletag;
        user.blizzardAccount = true;
        user.blizzardId = user.id;

        localStorage.setItem(this.blizzardProfileStorageItem, JSON.stringify(user));

        this.user.next(user);

        return user;
    }

    getBlizzardAccessToken(code) {

        return this.apiService.post('/oauth/getblizzardaccesstoken', { code: code })
            .map(
            (accesstoken) => {
                // console.log(accesstoken);
                this.blizzardAccess = accesstoken;
                this.blizzardAccess

                localStorage.setItem(this.blizzardAccessTokenStorageItem, JSON.stringify(accesstoken));

                return true;
            }
            )
    }

    isLoggedIn() {
        let user = this.user.getValue();
        let isLoggedIn = true;

        // let blizzardAccess = JSON.parse(localStorage.getItem(this.blizzardAccessTokenStorageItem));

        if (user.name == "" || user.name == undefined) {
            isLoggedIn = false;
        }

        return isLoggedIn;

    }

    checkIfNewAccount(oauthId) {

        return this.getOauthUser(oauthId)
            .map(
            (result) => {
                if (result.message != "Not Found") {
                    return false;
                }
                else {

                    return true;

                }
            }
            )
    }

    checkBlizzardToken() {
        // /oauth/check_token?token=<token>

        this.apiService.post('/oauth/validateBlizzardToken', { access_token: this.blizzardAccess.access_token })
            .subscribe(
            (response) => {
                console.log(response);
            }
            )

        // this.http.get("https://us.battle.net/oauth/check_token?access_token=" + this.blizzardAccess.access_token
        //     + "&client_id=" + environment.clientId
        // )
        //     .subscribe(
        //     (response) => {
        //         console.log(response);
        //     }
        //     )
    }

    changePassword(body) {
        return this.apiService.post(this.ACCOUNT_API_URL_BASE + "/updateAccount", body);
    }

    getUserPromise() {
        return this.apiService.get(this.ACCOUNT_API_URL_BASE + "/currentUser");
    }

    getOauthUser(oauthId) {
        return this.apiService.get(this.ACCOUNT_API_URL_BASE + "/oauthUser/" + oauthId);

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
        else if (this.user.getValue().blizzardId) {
            localStorage.removeItem(this.blizzardAccessTokenStorageItem);
            localStorage.removeItem(this.blizzardProfileStorageItem);
        }

        this.apiService.post(this.ACCOUNT_API_URL_BASE + "/logout", {})
            .subscribe((response) => {
                console.log("Logged out successfully");
                this.user.next({});
            })
    }

    oauthLogin(oauthId) {
        let body = {
            oauthId: oauthId
        }
        return this.apiService.post(this.ACCOUNT_API_URL_BASE + "/oauthLogin", body);
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
