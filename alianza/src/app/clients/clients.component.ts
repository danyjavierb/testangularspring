import {Component, Input, OnChanges, OnInit, SimpleChange, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Client} from '../models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnChanges {

  @Input()
  clients: Client[];

  displayedColumns: string[] = ['sharedKey', 'businessId', 'email', 'phone', 'createdAt'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  private dataSource: MatTableDataSource<Client>;

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Client>(this.clients);
    this.dataSource.paginator = this.paginator;
  }
  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    this.dataSource = new MatTableDataSource<Client>(this.clients);
  }
}

