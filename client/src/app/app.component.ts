import { Component, ViewContainerRef } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';

import { UserService } from './services/user.service';
import { GuildService } from './services/guild.service';

import { OAuthService } from "angular-oauth2-oidc";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { authConfig } from "./authConfig";
import { environment } from "../environments/environment";
declare var gapi: any;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';


    constructor(public userService: UserService,
        private toastr: ToastsManager,
        vRef: ViewContainerRef,
        guildService: GuildService,
        public oauthService: OAuthService
    ) {

        this.userService.getUser();
        
        this.toastr.setRootViewContainerRef(vRef);
        document.title = guildService.getGuildContext();
        // document.domain = environment.domain; 

        this.oauthService.configure(authConfig);
        this.oauthService.setStorage(localStorage);

        this.oauthService.strictDiscoveryDocumentValidation = false;
        this.oauthService.oidc = false;
        this.oauthService.loginUrl = environment.loginUrl;
        this.oauthService.logoutUrl = environment.logoutUrl;
    }

    initGoogle() {
        gapi.auth2.init({
            client_id: '1099140712491-esphn576cqr56kiqvsqi4kjd683jc9fm.apps.googleusercontent.com',
            scope: 'profile',
            
        })
    }

    logout() {
        this.userService.logout();
    }

    loggedIn() {
        return this.userService.user.value.name != undefined;
    }

}
