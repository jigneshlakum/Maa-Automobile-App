// model.ts

export interface Service {
  serviceType: string;
  isSelected: boolean;
}

export interface CarBooking {
  id: string;
  customerId: {
    _id: string;
    customerName: string;
  };
  start_date: string | null;
  end_date: string | null;
  advance_payment: number;
  status: string;
  kilometres: number;
  issue: string;
  additional_requirements: string;
  services: Service[];
}
