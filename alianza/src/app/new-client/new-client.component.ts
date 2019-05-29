import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {Client} from '../models/Client';
import {ClientServiceService} from '../services/client-service.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {
  @Output()
  onAddClient: EventEmitter<Client> = new EventEmitter();


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewClientComponent>,
    private api: ClientServiceService
  ) {
  }


  newUserForm: FormGroup;
  newCLient: Client;
  errorRequest = false;

  validation_messages = {
    'sharedKey': [
      {type: 'required', message: 'sharedKey is required.'}
    ],
    'businessId': [
      {type: 'required', message: 'businessId is required.'}
    ],
    'email': [
      {type: 'required', message: 'email is required.'},
      {type: 'email', message: 'incorrect email format'},
    ],
    'phone': [
      {type: 'required', message: 'phone is required.'}
    ]
  };

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.newUserForm = this.fb.group({
      sharedKey: ['', Validators.required],
      businessId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]]
    });
  }

  onSubmit(clientForm) {
    this.api.createClient(clientForm).subscribe((response) => {
        this.onAddClient.emit(new Client(response));
        this.dialogRef.close();
      }, (error) => {
        this.errorRequest = true;
      }
    );
  }

}
