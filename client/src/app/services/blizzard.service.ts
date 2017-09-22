import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { ApiService } from './api.service';

@Injectable()
export class BlizzardService {

  public api: string;
  public apiKey: string;

  constructor(private http: Http) {

    this.api = "https://us.api.battle.net/wow";
    this.apiKey = "fqvadba9c8auw7brtdr72vv7hfntbx7d"

  }

  getCharacter(realmName: string, characterName: string) {

    let url = `/character/${realmName}/${characterName}?` + this.getEndOfApiUrl();

    return this.get(this.api + url);
  }

  
  getRealms() {
    let url = "/realm/status?" + this.getEndOfApiUrl();
    
    return this.get(this.api + url);
  }
  
  getEndOfApiUrl() {
    return `locale=en_US&apikey=${this.apiKey}`;
  }
  
  get(url) {
    return this.http.get(url).map((response: Response) => response.json());
  }

}
