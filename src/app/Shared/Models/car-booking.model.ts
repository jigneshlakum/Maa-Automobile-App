// carBooking.model.ts

export interface CarBooking {
  id: string; // Use MongoDB ObjectId for id
  start_date: Date; // Assuming dates as strings for simplicity
  end_date: Date;
  advance_payment: number;
  status: string;
  kilometres: number;
  mileage: string;
  issue: string;
  additional_requirements: string;
  services: string[]; // Array of selected services
}
