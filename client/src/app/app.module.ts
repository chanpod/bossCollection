import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

//3rd Party
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { CookieModule } from 'ngx-cookie';
import { MarkdownModule } from 'angular2-markdown';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

//Components
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DialogOverviewExampleDialog } from './home/newTab.component';

//Routing
import { RoutingModule } from './routing/routing.module';
import { LayoutComponent } from './layout/layout.component';

//Services
import { UserService } from './services/user.service';
import { ApiService } from './services/api.service';
import { GuildService } from './services/guild.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogOverviewExampleDialog,
    LayoutComponent,
    LoginComponent
  ],
  entryComponents: [
    DialogOverviewExampleDialog
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
    FormsModule
  ],
  providers: [
    UserService,
    ApiService,
    GuildService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }