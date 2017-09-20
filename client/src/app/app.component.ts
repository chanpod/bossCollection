import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';

import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private userService: UserService) {
    this.userService.getUser();
  }
}
