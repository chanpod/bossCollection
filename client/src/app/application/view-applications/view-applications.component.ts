
import {of as observableOf,  Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { GuildService } from '../../services/guild.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';

//Components
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

//3rd party
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css']
})
export class ViewApplicationsComponent implements OnInit {

  applications: ApplicationsDataSource;
  rejectedApplications: RejectedApplicationsDataSource;
  displayedColumns: Array<any>;
  loading: boolean;

  constructor(private guildService: GuildService,
    private router: Router,
    private toastr: ToastsManager,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.displayedColumns = ["Character", "Date Applied", "View Application"]


    this.getGuildApplications();
  }

  getGuildApplications() {

    this.loading = true;

    this.guildService.getApplications()
      .subscribe((applications) => {

        this.loading = false;
        this.applications = new ApplicationsDataSource(applications.applications);


      }, (error) => {

        this.loading = false;
      })

    this.guildService.getRejectedApplications()
      .subscribe((applications) => {

        this.loading = false;
        this.rejectedApplications = new RejectedApplicationsDataSource(applications.applications);
        
      }, (error) => {

        this.loading = false;
      })
  }

  rejectApplication(application) {
    let body = {
      application: application
    };

    var dialogConfig = new MatDialogConfig()
    dialogConfig.data = {
      message: "You are about to reject " + application.character + ". Are you sure?"
    }    

    let dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

      if (result == true) {

        this.guildService.rejectApplication(body)
          .subscribe((result) => {

            this.getGuildApplications();
            this.toastr.success("Successfully deleted the application");
          })
      }
    });


  }

  deleteApplication(application) {
    let body = {
      appID: application._id
    };

    var dialogConfig = new MatDialogConfig()
    dialogConfig.data = {
      message: "You are about to permanently delete the application for " + application.character + " . Are you sure?"
    }    


    let dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

      if (result == true) {

        this.guildService.deleteApplication(body)
          .subscribe((result) => {

            this.getGuildApplications();
            this.toastr.success("Successfully deleted the application");
          })
      }
    });


  }

  getUrl(application) {
    return `assets/images/classIcons/images/class/64/${application.class}.png`
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
    return observableOf(this.tableData);
  }

  disconnect() { }
}

export class RejectedApplicationsDataSource extends DataSource<any> {

  tableData: Array<any>;

  constructor(tableData) {
    super();
    this.tableData = tableData;
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return observableOf(this.tableData);
  }

  disconnect() { }
}
