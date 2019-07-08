
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BlizzardService {

  public api: string;
  public apiKey: string;
  public classes: Array<string>;
  constructor(private http: HttpClient) {

    this.api = "https://us.api.battle.net/wow";
    this.apiKey = "fqvadba9c8auw7brtdr72vv7hfntbx7d"
    this.classes = ["placeholder", "warrior", "paladin", "hunter", "rogue", "priest", "deathknight", "shaman", "mage", "warlock", "monk", "druid", "demonhunter"];

  }

  getCharacter(realmName: string, characterName: string) {

    let url = `/character/${realmName}/${characterName}?` + this.getEndOfApiUrl();

    return this.get(this.api + url);
  }

  getCharacterArmory(realmName: string, characterName: string) {
    let getCharacterUrl = this.api + "/character/" + realmName + "/" + characterName + "?fields=items,progression&" + this.getEndOfApiUrl();

    return this.get(getCharacterUrl);
  }

  getRealms() {
    let url = "/realm/status?" + this.getEndOfApiUrl();

    return this.get(this.api + url);
  }

  getClass(classId){
    return this.classes[classId];
  }

  getEndOfApiUrl() {
    return `locale=en_US&apikey=${this.apiKey}`;
  }

  get(url) {
    return this.http.get(url).pipe(map((response: Response) => response.json()));
  }

}
