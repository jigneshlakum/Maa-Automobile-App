// import more effects here if needed

import { BookingEffects } from "./Car-Booking/car-booking.effects";
import { CommissionEffects } from "./CommissionAction/Commission.Effects";
import { CustomerEffects } from "./CustomerAction/customer.effects";
import { EmployeeEffects } from "./Employee/employees.effects";
import { EmployeeGroupEffects } from "./EmployeeMaster/employees-group.effects";
import { InvoiceEffects } from "./InvoiceAction/invoice.effects";
import { MenuEffects } from "./SidebarAction/sidebar.effects";
import { AuthEffects } from "./UserAction/effects";

export const effects = [
  AuthEffects,
  CommissionEffects,
  EmployeeGroupEffects,
  MenuEffects,
  EmployeeEffects,
  CustomerEffects,
  BookingEffects,
  InvoiceEffects,

  // add more effects here
];
