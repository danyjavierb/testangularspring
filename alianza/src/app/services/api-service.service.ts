import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {Client} from '../models/Client';

import {map, filter, switchMap, catchError} from 'rxjs/operators';
import {ClientDtoAdvanced} from '../models/ClientDtoAdvanced';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  const;
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getAllClients(): Observable<Client[]> {
    return this.http
      .get<Client[]>(this.API_URL + '/clients').pipe(
        map(data => {
          return data.map((client) => {
            return new Client(client);
          });
        }),
        catchError(this.handleError)
      );

  }

  public createClient(client: Client): Observable<Client> {
    return this.http
      .post<Client>(this.API_URL + '/clients', client).pipe(
        map(data => {
          return new Client(data);
        }),
        catchError(this.handleError)
      );

  }

  public getClientBySharedKey(sharedKey: string): Observable<Client[]> {
    return this.http
      .get<Client[]>(this.API_URL + '/clients/' + sharedKey).pipe(
        map(data => {
          return data.map((client) => {
            return new Client(client);
          });
        }),
        catchError(this.handleError)
      );
  }

  public getClientByAdvanced(client: ClientDtoAdvanced): Observable<Client[]> {
    return this.http
      .post<Client[]>(this.API_URL + '/clients/advanced', client).pipe(
        map(data => {
          return data.map((res) => {
            return new Client(res);
          });
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return throwError(error);
  }
}
