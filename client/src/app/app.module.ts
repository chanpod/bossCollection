import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

//3rd Party
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { CookieModule } from 'ngx-cookie';
import { MarkdownModule } from 'angular2-markdown';

//Components
import { LoginComponent } from './login/login.component';
import { ResetPasswordDialogComponent } from './login/resetPasswordDialog.component';
import { HomeComponent } from './home/home.component';
import { NewTabDialog } from './home/newTab.component';

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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewTabDialog,
    LayoutComponent,
    LoginComponent,
    ResetPasswordDialogComponent
  ],
  entryComponents: [
    NewTabDialog,
    ResetPasswordDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpModule,
    CookieModule,
    MarkdownModule.forRoot(),
    ToastModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    ApplicationModule
  ],
  providers: [
    UserService,
    ApiService,
    GuildService,
    BlizzardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
