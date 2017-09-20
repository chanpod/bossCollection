import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes, RouterModule}           from '@angular/router';

//Components
import {HomeComponent} from '../home/home.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent
  } 
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]  
})
export class RoutingModule { }
