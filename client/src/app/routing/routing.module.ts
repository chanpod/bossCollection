import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes, RouterModule}           from '@angular/router';

//Components
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../login/login.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent    
  },
  {
    path: 'login', component: LoginComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]  
})
export class RoutingModule { }
