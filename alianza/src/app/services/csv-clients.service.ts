import {Injectable} from '@angular/core';
import {AngularCsv} from 'angular7-csv/dist/Angular-csv';

@Injectable({
  providedIn: 'root'
})
export class CsvClientsService {

  constructor() {
  }

  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Clients:',
    useBom: true,
    noDownload: false,
    headers: ['shared key', 'Business Id', 'Email', 'Phone', 'Data Added']
  };

  exportDataAsCsv(data) {
    return new AngularCsv(data, 'clients' + Date.now(), this.csvOptions);
  }
}
