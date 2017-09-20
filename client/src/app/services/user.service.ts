import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from "rxjs/Rx";

import { ApiService } from './api.service';

@Injectable()
export class UserService {

  public user: Subject<any> = new Subject();

  constructor(private apiService: ApiService) {

  }

  getUser() {
    this.apiService.get("/test")
      .subscribe((response) => {
        console.log(response)
      },
      (error) => {
        console.log("API call failed");
        console.log(error);
      })

  }

}
