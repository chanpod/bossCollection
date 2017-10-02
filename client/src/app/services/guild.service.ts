import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class GuildService {

  private GUILD_API_BASE_URL: string = "/guild/guild";
  private APP_API_BASE_URL: string = "/guild/applications";

  constructor(private apiService: ApiService) { }

  getTabs(guildName) {

    return this.apiService.get(this.GUILD_API_BASE_URL + "/guildHomepage/" + guildName);

  }

  updateTabs(guildObject, guildName) {
    let body = {
      guild: guildObject
    }

    return this.apiService.post(this.GUILD_API_BASE_URL + "/guildHomepage/" + guildName, body);
  }

  submitApplication(newApplication) {
    let body = { "newApplicant": newApplication }

    return this.apiService.post(this.APP_API_BASE_URL + "/applicationSubmission", body);
  }

  getApplications() {
    return this.apiService.get(this.APP_API_BASE_URL + "/getApplications/TBD")
  }

  getApplication(appId) {
    return this.apiService.get(this.APP_API_BASE_URL + "/getApplication/" + appId);
  }  

  getGuildName(){
    console.log(window.location.hostname);
    let hostname = window.location.hostname;

    let splitHostName = hostname.split(".");

    console.log(splitHostName[0]);
  }

}
