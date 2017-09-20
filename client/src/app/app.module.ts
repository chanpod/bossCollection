import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';

//3rd Party
import { MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { HomeComponent } from './home/home.component'; 

//Routing
import {RoutingModule} from './routing/routing.module';
import { LayoutComponent } from './layout/layout.component';

//Services
import {UserService} from './services/user.service';
import {ApiService} from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpModule
  ],
  providers: [
    UserService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
