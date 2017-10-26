import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

//Components
import { CreateGuildComponent } from '../create-guild/create-guild.component';

//Guards
import {CreateGuildGuard} from '../guards/CreateGuild.guard';

export const routes: Routes = [
  {
    path: 'guild/createGuild', 
    component: CreateGuildComponent,
    canActivate: [CreateGuildGuard]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }