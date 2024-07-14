import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './UserAction/reducers';
import { COMMISSIONReducer } from './CommissionAction/Commission.Reducer';
import { employeeGroupReducer } from './EmployeeMaster/employees-group.reducer';
import { menuReducer } from './SidebarAction/sidebar.reducer';
import { employeeReducer } from './Employee/employees.reducer';
import { customerReducer } from './CustomerAction/customer.reducer';
import { bookingReducer } from './Car-Booking/car-booking.reducer';

export interface AppState {
  auth: any;
  // other state slices
}


export const reducers: ActionReducerMap<any> = {
  auth: authReducer,
  commission : COMMISSIONReducer,
  employeeGroup : employeeGroupReducer,
  menu : menuReducer,
  employeeItems : employeeReducer,
  customers:customerReducer,
  bookings : bookingReducer
  // add more reducers here
};
