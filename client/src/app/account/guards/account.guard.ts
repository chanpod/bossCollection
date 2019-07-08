
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class AccountGuard implements CanActivate {

  constructor(
    private user: UserService,
    public toastr: ToastsManager,
    private router: Router
  ) { }

  canActivate() {

    return this.user.getUserPromise().pipe(map(
      (response) => {

        let canActivate = this.user.isLoggedIn();
    
        if (!this.user.isLoggedIn()) {
          canActivate = false;
          this.toastr.error("Must be logged in.");
          this.router.navigate(['/'])
        }
    
        return canActivate;
      }
    ))
  }
}