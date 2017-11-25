import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { OAuthService } from "angular-oauth2-oidc";

import { UserService } from '../services/user.service';

import { ResetPasswordDialogComponent } from './resetPasswordDialog.component';
import { MatDialog } from '@angular/material';

import { authConfig } from "../authConfig";
import { environment } from "../../environments/environment";

declare var gapi: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public LoginForm: FormGroup;
    public loading: boolean;
    public googleProfile: any;
    public blizzardCode: string;
    public blizzardAccessToken: string;

    constructor(
        private userService: UserService,
        public activatedRoute: ActivatedRoute,
        private router: Router,
        private oAuthService: OAuthService,
        private zone: NgZone,
        public dialog: MatDialog,
        private toastr: ToastsManager) {

    }

    ngOnInit() {
        gapi.signin2.render("googleButton");
        this.loading = false;

        this.LoginForm = new FormGroup({
            Name: new FormControl(''),
            Password: new FormControl('')
        });

        this.userService.user.subscribe((user) => {
            if (user.name != undefined) {
                this.router.navigate(['']);
            }
        })

        this.checkBlizzardCode();
    }

    googleLogin() {
        gapi.auth2.getAuthInstance()
            .signIn({
                scope: 'profile'
            })
            .then((googleUser) => {
                this.googleProfile = googleUser.getBasicProfile();
                this.checkIfNewAccount(this.googleProfile);
            })
    }

    checkBlizzardCode() {
        this.activatedRoute.queryParams.subscribe(
            (params) => {
                if (params.code) {
                    this.blizzardCode = params.code;
                    this.getBlizzardccessToken();
                }
            }
        )
        this.activatedRoute.params.subscribe(
            (params) => {
                console.log(params);
            }
        )
    }

    getBlizzardccessToken() {

        this.userService.getBlizzardAccessToken(this.blizzardCode)
            .subscribe(
            (response) => {
                if (response) {
                    this.userService.getBlizzardProfile()
                        .subscribe(
                            (profile) => {
                                console.log(profile);
                            }
                        )

                }
            }
            )
    }

    checkIfNewAccount(googleUser) {

        let email = this.googleProfile.getEmail();

        this.userService.getGoogleUser(email)
            .subscribe(
            (result) => {
                if (result.message != "Not Found") {
                    this.googleSignIn();
                }
                else {

                    let user = {
                        name: this.googleProfile.getName(),
                        email: this.googleProfile.getEmail(),
                        googleId: this.googleProfile.getId(),
                        googleSignup: true
                    }

                    this.userService.signUp(user)
                        .subscribe(
                        (result) => {

                            this.googleSignIn();
                        }
                        )

                }
            }
            )
    }

    googleSignIn() {

        let email = this.googleProfile.getEmail();

        this.userService.googleLogin(email)
            .subscribe(
            (result) => {
                if (result) {
                    this.loginSuccess();
                }
            }
            )
    }

    getGoogleProfile(googleUser) {

        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

    blizzardLogin() {
        console.log(encodeURIComponent(environment.redirectUri));
        let blizzardLoginUrl = environment.loginUrl
            + "?"
            + "grant_type=authorization_code"
            + "&response_type=code"
            + "&redirect_uri=" + encodeURIComponent(environment.redirectUri)
            + "&scope=wow.profile"
            + "&client_id=" + environment.clientId

        window.location.replace(blizzardLoginUrl);
        this.oAuthService.responseType = "code";

        // this.oAuthService.initImplicitFlow();

        //https://us.battle.net/oauth/authorize?response_type=code&client_id=fqvadba9c8auw7brtdr72vv7hfntbx7d&redirect_uri=https%3A%2F%2Flocalhost%3A4200%2Flogin&scope=wow.profile
    }

    openResetEmailDialog() {
        let dialogRef = this.dialog.open(ResetPasswordDialogComponent, {

        });

        dialogRef.afterClosed().subscribe(result => {

            if (result != null) {


            }
        });
    }

    login() {

        this.loading = true;

        this.userService.login(this.LoginForm.controls.Name.value, this.LoginForm.controls.Password.value)
            .subscribe((response) => {

                this.loginSuccess();
                this.loading = false;
            }, (error) => {

                this.loading = false;
                this.toastr.error(error.json().message);
            })
    }

    loginSuccess() {
        this.userService.getUser();
        this.zone.run(() => this.router.navigate(['/']));

    }

}
