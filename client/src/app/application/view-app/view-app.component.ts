import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GuildService } from '../../services/guild.service';
import { BlizzardService } from '../../services/blizzard.service';


@Component({
  selector: 'app-view-app',
  templateUrl: './view-app.component.html',
  styleUrls: ['./view-app.component.css']
})
export class ViewAppComponent implements OnInit {

  appId: string;
  loading: boolean;
  app: {
    character: string,
    class: string,
    realm: string,
    previousGuild: string,
    role: string,
    comments: string,
    desiredRole: string,
    dateApplied: string,
    guild: string,
    status: string,
    batteltag: string,
    aboutPage: boolean,
    canYouMakeRaidTimes: boolean,
    voiceCommunications: boolean,
    uiScreenshot: string,
    logsLink: string,
    aboutYourself: string,
    raidExperience: string,
    prepareForNewEncounter: string,
    spec: string,
    flexibility: string,
    statPriority: string,
    rotation: string
  };
  armoryData: any;

  constructor(
    private route: ActivatedRoute,
    private guildService: GuildService,
    private blizzardService: BlizzardService
  ) {

  }

  ngOnInit() {

    this.app = {
      character: '',
      class: '',
      realm: '',
      previousGuild: '',
      role: '',
      comments: '',
      desiredRole: '',
      dateApplied: '',
      guild: '',
      status: '',
      batteltag: '',
      aboutPage: false,
      canYouMakeRaidTimes: false,
      voiceCommunications: false,
      uiScreenshot: '',
      logsLink: '',
      aboutYourself: '',
      raidExperience: '',
      prepareForNewEncounter: '',
      spec: '',
      flexibility: '',
      statPriority: '',
      rotation: ''
    };

    this.route.params.subscribe((routeParams) => {
      this.appId = routeParams['appId'];

      this.guildService.getApplication(this.appId)
        .subscribe((app) => {

          console.log(app);
          this.app = app[0];

          this.blizzardService.getCharacterArmory(this.app.realm, this.app.character)
            .subscribe((armoryDetails) => {

              this.armoryData = armoryDetails;
            })
        }, (error) => {
          console.log(error);
        })

    })
  }

  armoryUrl(realm, character) {
    var url = "https://us.battle.net/wow/en/character/" + realm + "/" + character + "/simple";

    return url;
  }

}
