import {Component, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {NewClientComponent} from '../new-client/new-client.component';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Client} from '../models/Client';
import {ClientServiceService} from '../services/client-service.service';
import {CsvClientsService} from '../services/csv-clients.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  value = '';
  advancedSearch = false;
  clients: Client[] = [];

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private api: ClientServiceService,
    private csvService: CsvClientsService
  ) {
  }

  ngOnInit() {
    this.route.data.pipe(
      map((data) => data['clients'])
    ).subscribe(
      (clients) => {
        this.clients = clients;
      }
    );
  }

  searchByKey() {

    this.api.getClientBySharedKey(this.value).subscribe((result) => {
      this.clients = result;
    });

  }

  onAdvancedSearch(clients: Client[]) {
    this.clients = clients;
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewClientComponent, {
      height: '500px',
      width: '400px',
    });

    dialogRef.componentInstance.onAddClient.subscribe(result => {
      this.clients = this.clients.concat(result);
    });
  }

  openAdvancedSearch() {
    this.advancedSearch = !this.advancedSearch;
  }

  downloadCsv() {
    this.csvService.exportDataAsCsv(this.clients);
  }

}
