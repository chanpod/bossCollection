import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

//Components
import { CreateApplicationComponent } from '../create-application/create-application.component';
import { ViewApplicationsComponent } from '../view-applications/view-applications.component';
import { ViewAppComponent } from '../view-app/view-app.component';


export const routes: Routes = [
  {
    path: 'createApplication', component: CreateApplicationComponent
  },
  {
    path: 'viewApplications', component: ViewApplicationsComponent
  },
  {
    path: 'viewApp/:appId', component: ViewAppComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
