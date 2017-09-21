import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class GuildService {

  private ACCOUNT_API_URL_BASE: string = "/guild/guild";

  constructor(private apiService: ApiService) { }

  getTabs(guildName) {

    return this.apiService.get(this.ACCOUNT_API_URL_BASE + "/guildHomepage/" + guildName);

  }

  updateTabs(guildObject, guildName) {
    let body = {
      guild: guildObject
    }

    return this.apiService.post(this.ACCOUNT_API_URL_BASE + "/guildHomepage/" + guildName, body);
  }

}
