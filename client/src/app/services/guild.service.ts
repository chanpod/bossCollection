import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable()
export class GuildService {

  private GUILD_API_BASE_URL: string = "/guild/guild";
  private APP_API_BASE_URL: string = "/guild/applications";

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) { }

  createGuild(guildName: String) {
    let body = {
      guildName: guildName
    };

    return this.apiService.post(this.GUILD_API_BASE_URL + "/addGuild", body);
  }

  leaveGuild(guildName: String) {

    let body = {
      guildName: guildName
    }

    return this.apiService.post(this.GUILD_API_BASE_URL + "/removeMember", body);
  }

  guildOwned() {
    let guildContext = this.getGuildContext();
    return this.apiService.get(this.GUILD_API_BASE_URL + "/guildOwned/" + guildContext);
  }

  claimGuild(guildName: String) {

    let body = {
      guildName: guildName
    }

    return this.apiService.post(this.GUILD_API_BASE_URL + "/claimGuild", body);
  }

  getGuildSettings(guildName) {

    return this.apiService.get(this.GUILD_API_BASE_URL + "/guildSettings/" + guildName);
  }

  updateGuildSettings(guildSettings: any) {
    let body = {
      guild: guildSettings
    }

    return this.apiService.post(this.GUILD_API_BASE_URL + "/guildSettings", body);
  }

  getTabs(guildName: String) {

    return this.apiService.get(this.GUILD_API_BASE_URL + "/guildHomepage/" + guildName);

  }

  updateTabs(guildObject: any, guildName: String) {
    let body = {
      guild: guildObject
    }

    return this.apiService.post(this.GUILD_API_BASE_URL + "/guildHomepage/" + guildName, body);
  }

  submitApplication(newApplication: any) {
    let body = { "newApplicant": newApplication }

    return this.apiService.post(this.APP_API_BASE_URL + "/applicationSubmission", body);
  }

  getApplications() {
    return this.apiService.get(this.APP_API_BASE_URL + "/getApplications/" + this.getGuildContext())
  }
  
  getRejectedApplications(){

    return this.apiService.get(this.APP_API_BASE_URL + "/getRejectedApplications/" + this.getGuildContext())
  }

  getApplication(appId) {
    return this.apiService.get(this.APP_API_BASE_URL + "/getApplication/" + appId);
  }

  deleteApplication(body) {
    return this.apiService.post(this.APP_API_BASE_URL + "/deleteApplication", body);
  }

  rejectApplication(body) {
    return this.apiService.post(this.APP_API_BASE_URL + "/rejectApplication", body);
  }

  getGuildContext() {

    let hostname = window.location.hostname;

    let splitHostName = hostname.split(".");
    let guildContext = splitHostName[0];

    if (guildContext == "localhost") {
      guildContext = "test";
    }

    return guildContext;
  }

}
