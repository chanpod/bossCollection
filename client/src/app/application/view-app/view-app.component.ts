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
  app: any;
  armoryData: any;
  constructor(
    private route:ActivatedRoute,
    private guildService:GuildService,
    private blizzardService: BlizzardService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((routeParams) => {
      this.appId = routeParams['appId'];

      this.guildService.getApplication(this.appId)
        .subscribe((app) => {

          console.log(app);
          this.app = app[0];

          this.blizzardService.getCharacterArmory(this.app.realm, this.app.character)
            .subscribe((armoryDetails) =>{

              this.armoryData = armoryDetails;
            })
        }, (error) => {
          console.log(error);
        })

    })
  }

}
