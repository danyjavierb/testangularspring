import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {ClientServiceService} from '../services/client-service.service';
import {Client} from '../models/Client';


@Injectable()
export class ClientsResolver implements Resolve<Observable<Client[]>> {

  constructor(
    private clientService: ClientServiceService
  ) {
  }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Client[]> {
    return this.clientService.getAllClients();
  }
}
