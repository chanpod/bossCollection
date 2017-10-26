import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGuildComponent } from './create-guild/create-guild.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//3rd Party
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

//Routing
import { RoutingModule } from './routing/routing.module';

//Guards
import {CreateGuildGuard} from './guards/CreateGuild.guard';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, 
    MaterialModule
  ],
  declarations: [
    CreateGuildComponent    
  ],
  providers: [
    CreateGuildGuard
  ]
})
export class GuildModule { }
