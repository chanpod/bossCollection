import { Component, ViewContainerRef } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';

import { UserService } from './services/user.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private userService: UserService, private toastr: ToastsManager, vRef: ViewContainerRef) {
    this.userService.getUser();
    this.toastr.setRootViewContainerRef(vRef);

  }

}
