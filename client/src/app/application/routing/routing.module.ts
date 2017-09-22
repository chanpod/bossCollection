import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

//Components
import { CreateApplicationComponent } from '../create-application/create-application.component';


export const routes: Routes = [
  {
    path: 'createApplication', component: CreateApplicationComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
