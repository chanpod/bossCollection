import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

//Components
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { AccountComponent } from '../account/account.component';

//Guards
import {AccountGuard} from '../account/guards/account.guard';

export const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'account', component: AccountComponent, canActivate: [AccountGuard]
  }
] 

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
