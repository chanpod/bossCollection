import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Routing
import { RoutingModule } from './routing/routing.module';

//3rd Party

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { ToastModule } from 'ng2-toastr/ng2-toastr';


import { ViewApplicationsComponent } from './view-applications/view-applications.component';
import { ViewAppComponent } from './view-app/view-app.component';

import {CoreModule} from '../CoreModule';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    CoreModule,
    BrowserAnimationsModule    
  ],
  declarations: [
    CreateApplicationComponent,
    ViewApplicationsComponent,
    ViewAppComponent
  ]
})
export class ApplicationModule { } 
