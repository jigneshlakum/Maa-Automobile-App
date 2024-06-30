import { EntityState } from '@ngrx/entity';

export interface CommissionModel {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
  };
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    // Add other bank-related properties as needed
  };
  birthDate: string;
  bloodGroup: string;
  company: {
    department: string;
    name: string;
    title: string;
    // Add other company-related properties as needed
  };
  crypto: {
    coin: string;
    wallet: string;
    network: string;
    // Add other crypto-related properties as needed
  };
  ein: string;
  email: string;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
    // Add other hair-related properties as needed
  };
  height: number;
  image: string;
  ip: string;
  macAddress: string;
  password: string;
  phone: string;
  role: string;
  ssn: string;
  university: string;
  userAgent: string;
  username: string;
  weight: number;
}


export interface CommissionStatus extends EntityState<CommissionModel> {
  errormessage: string;
  isloading: boolean;
}


