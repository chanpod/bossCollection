import { Component, ViewContainerRef } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';

import { UserService } from './services/user.service';
import { GuildService } from './services/guild.service';

// import { OAuthService } from "angular-oauth2-oidc";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// import { authConfig } from "./authConfig";
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']     
})
export class AppComponent {
  title = 'app';


  constructor(private userService: UserService,
    private toastr: ToastsManager,
    vRef: ViewContainerRef,
    guildService: GuildService
    ) {

    this.userService.getUser();
    this.toastr.setRootViewContainerRef(vRef);
    document.title = guildService.getGuildContext();
    document.domain = environment.domain;

    // this.oauthService.configure(authConfig);
    // this.oauthService.setStorage(localStorage);
    
    // this.oauthService.strictDiscoveryDocumentValidation = false;
    // this.oauthService.loginUrl = environment.loginUrl;
    // this.oauthService.logoutUrl = environment.logoutUrl;
  }

  logout() {
    this.userService.logout();
  }

  loggedIn() {
    return this.userService.user.value.name != undefined;
  }

}
