import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule  } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {CoreModule} from './CoreModule';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { MarkdownModule } from 'angular2-markdown';
import { OAuthModule } from 'angular-oauth2-oidc';

//Components
import { LoginComponent } from './login/login.component';
import { ResetPasswordDialogComponent } from './login/resetPasswordDialog.component';
import { HomeComponent } from './home/home.component';
import { NewTabDialog } from './home/newTab.component';
import { ImageUrlDialog } from './home/imageUrl.component';

//Routing
import { RoutingModule } from './routing/routing.module';
import { LayoutComponent } from './layout/layout.component';

//Services
import { UserService } from './services/user.service';
import { ApiService } from './services/api.service';
import { GuildService } from './services/guild.service';
import { BlizzardService } from './services/blizzard.service';

//Modules
import { ApplicationModule } from './application/application.module';
import { AccountComponent } from './account/account.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { GuildModule } from './guild/guild.module';

//Guards
import { AccountGuard } from './account/guards/account.guard';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewTabDialog,
    ImageUrlDialog,
    LayoutComponent,
    LoginComponent,
    ResetPasswordDialogComponent,
    AccountComponent,
    ConfirmDialogComponent,
    RegistrationComponent
  ],
  entryComponents: [
    NewTabDialog,
    ImageUrlDialog,
    ConfirmDialogComponent,
    ResetPasswordDialogComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpModule,
    HttpClientModule,
    //Material Modules ===
    CoreModule,
    //====
    MarkdownModule.forRoot(),
    ToastModule.forRoot(),
    OAuthModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    ApplicationModule,
    GuildModule,
  ],
  providers: [
    UserService,
    ApiService,
    GuildService,
    BlizzardService,
    AccountGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



