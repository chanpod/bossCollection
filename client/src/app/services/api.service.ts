
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  public url: string;

  constructor(private http: HttpClient) {
    this.url = "/api";
  }

  get(url) {
    return this.http.get(this.url + url).pipe(
      map((res: Response) => res.json()));      

  }

  post(url, body) {
    return this.http.post(this.url + url, body).pipe(
      map((res: Response) => res.json()));
      
  }

}
