// import more effects here if needed

import { CommissionEffects } from "./CommissionAction/Commission.Effects";
import { CustomerEffects } from "./CustomerAction/customer.effects";
import { EmployeeEffects } from "./Employee/employees.effects";
import { EmployeeGroupEffects } from "./EmployeeMaster/employees-group.effects";
import { MenuEffects } from "./SidebarAction/sidebar.effects";
import { AuthEffects } from "./UserAction/effects";

export const effects = [
  AuthEffects,
  CommissionEffects,
  EmployeeGroupEffects,
  MenuEffects,
  EmployeeEffects,
  CustomerEffects,

  // add more effects here
];
