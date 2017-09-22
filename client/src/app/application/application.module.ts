import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Routing
import {RoutingModule} from './routing/routing.module';

//3rd Party
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  declarations: [CreateApplicationComponent]
})
export class ApplicationModule { } 
