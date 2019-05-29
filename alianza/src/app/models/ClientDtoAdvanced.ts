export class ClientDtoAdvanced {
  sharedKey = '';
  businessId = '';
  email = '';
  phone: 0;
  startsAt =  Date();
  endsAt =  Date();

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

