import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { GuildService } from '../../services/guild.service';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

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
  displayedColumns: Array<any>;
  loading: boolean;

  constructor(private guildService: GuildService,
    private router: Router,
    private toastr: ToastsManager,
    public dialog: MdDialog) { }

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
  }

  deleteApplication(application) {
    let body = {
      application: application
    };

    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      
    });

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
    return Observable.of(this.tableData);
  }

  disconnect() { }
}
