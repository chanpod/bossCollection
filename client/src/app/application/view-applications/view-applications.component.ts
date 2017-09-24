import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { GuildService } from '../../services/guild.service';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css']
})
export class ViewApplicationsComponent implements OnInit {

  applications: ApplicationsDataSource;
  displayedColumns: Array<any>;
  loading: boolean;

  constructor(private guildService: GuildService, private router: Router) { }

  ngOnInit() {

    this.loading = true;
    this.displayedColumns = ["Character", "Date Applied", "View Application"]

    this.guildService.getApplications()
      .subscribe((applications) => {

        this.loading = false;
        this.applications = new ApplicationsDataSource(applications.applications);
      }, (error) => {
        
        this.loading = false;
      })
  }

  viewApp(app) {
    this.router.navigateByUrl("/viewApp/" + app._id);
  }
}

export class ApplicationsDataSource extends DataSource<any> {

  tableData: Array<any>;

  constructor(tableData) {
    super();
    this.tableData = tableData;
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return Observable.of(this.tableData);
  }

  disconnect() { }
}
