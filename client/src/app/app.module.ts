import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

//3rd Party
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { HomeComponent } from './home/home.component';
import { CookieModule } from 'ngx-cookie';


//Routing
import { RoutingModule } from './routing/routing.module';
import { LayoutComponent } from './layout/layout.component';

//Services
import { UserService } from './services/user.service';
import { ApiService } from './services/api.service';
import { GuildService } from './services/guild.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpModule,
    CookieModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    ApiService,
    GuildService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
