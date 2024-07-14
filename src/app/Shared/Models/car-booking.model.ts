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
  mileage: string;
  issue: string;
  additional_requirements: string;
  services: any[];
}
