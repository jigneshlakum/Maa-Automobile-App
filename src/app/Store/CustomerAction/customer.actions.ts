import { createAction, props } from '@ngrx/store';
import { Customer } from '../../Shared/Models/Customer.model';

export const loadCustomers = createAction('[Customer] Load Customers');
export const loadCustomersSuccess = createAction('[Customer] Load Customers Success', props<{ customers: Customer[] }>());
export const loadCustomersFailure = createAction('[Customer] Load Customers Failure', props<{ error: string }>());
