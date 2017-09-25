import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ApiService {

  public url: string;

  constructor(private http: Http) {
    this.url = "/api";
  }

  get(url) {
    return this.http.get(this.url + url)
      .map((res: Response) => res.json());      

  }

  post(url, body) {
    return this.http.post(this.url + url, body)
      .map((res: Response) => res.json());
      
  }

}
