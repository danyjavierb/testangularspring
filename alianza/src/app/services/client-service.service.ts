import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Client} from '../models/Client';
import {ApiServiceService} from './api-service.service';
import {ClientDtoAdvanced} from '../models/ClientDtoAdvanced';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private api: ApiServiceService) {
  }

  getAllClients(): Observable<Client[]> {
    return this.api.getAllClients();
  }

  createClient(client: Client): Observable<Client> {
    return this.api.createClient(client);
  }

  getClientBySharedKey(sharedKey: string): Observable<Client[]> {
    return this.api.getClientBySharedKey(sharedKey);
  }

  getClientByAdvanced(client: ClientDtoAdvanced): Observable<Client[]> {
    return this.api.getClientByAdvanced(client);
  }
}
