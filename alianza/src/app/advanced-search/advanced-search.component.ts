import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientServiceService} from '../services/client-service.service';
import {Client} from '../models/Client';
import {ClientDtoAdvanced} from '../models/ClientDtoAdvanced';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private clientService: ClientServiceService
  ) {
  }

  searchForm: FormGroup;

  @Output()
  advanceSearch: EventEmitter<Client[]> = new EventEmitter();


  validation_messages = {
    'email': [
      {type: 'email', message: 'incorrect email format'},
    ]
  };

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.searchForm = this.fb.group({
      sharedKey: [''],
      businessId: [''],
      email: ['', Validators.email],
      phone: [],
      startsAt: ['2019-01-01'],
      endsAt: ['2019-12-31']
    });
  }


  onSubmit(value) {
    this.clientService.getClientByAdvanced(this.cleanData(value)).subscribe((clients) => {
      this.advanceSearch.emit(clients);
    });
  }

  cleanData(o) {
    if (Object.prototype.toString.call(o) === '[object Array]') {
      for (let key = 0; key < o.length; key++) {
        this.cleanData(o[key]);
        if (Object.prototype.toString.call(o[key]) === '[object Object]') {
          if (Object.keys(o[key]).length === 0) {
            o.splice(key, 1);
            key--;
          }
        }

      }
    } else if (Object.prototype.toString.call(o) === '[object Object]') {
      for (const key in o) {
        const value = this.cleanData(o[key]);
        if (value === null) {
          delete o[key];
        }
        if (Object.prototype.toString.call(o[key]) === '[object Object]') {
          if (Object.keys(o[key]).length === 0) {
            delete o[key];
          }
        }
        if (Object.prototype.toString.call(o[key]) === '[object Array]') {
          if (o[key].length === 0) {
            delete o[key];
          }
        }
      }
    }
    return o;
  }
}
