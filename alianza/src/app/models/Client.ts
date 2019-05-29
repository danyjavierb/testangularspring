export class Client {
  sharedKey: string;
  businessId: string;
  email: string;
  phone: number;
  createdAt: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

