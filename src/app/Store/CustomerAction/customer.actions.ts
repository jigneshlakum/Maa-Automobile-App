import { createAction, props } from '@ngrx/store';
import { Customer } from '../../Shared/Models/Customer.model';

export const loadCustomers = createAction('[Customer] Load Customers');
export const loadCustomersSuccess = createAction('[Customer] Load Customers Success', props<{ customers: Customer[] }>());
export const loadCustomersFailure = createAction('[Customer] Load Customers Failure', props<{ error: string }>());



// Save Customer Actions
export const saveCustomer = createAction('[Customer] Save Customer', props<{ customer: Customer }>());
export const saveCustomerSuccess = createAction('[Customer] Save Customer Success', props<{ message: string }>());
export const saveCustomerFailure = createAction('[Customer] Save Customer Failure', props<{ error: string }>());


// Delete Customer Actions
export const deleteCustomer = createAction('[Customer] Delete Customer', props<{ id: any }>());
export const deleteCustomerSuccess = createAction('[Customer] Delete Customer Success', props<{ id: any, message: string }>());
export const deleteCustomerFailure = createAction('[Customer] Delete Customer Failure', props<{ error: string }>());



// Get Customer by ID Actions
export const getCustomerById = createAction('[Customer] Get Customer By ID', props<{ id: any }>());
export const getCustomerByIdSuccess = createAction('[Customer] Get Customer By ID Success', props<{ customer: Customer }>());
export const getCustomerByIdFailure = createAction('[Customer] Get Customer By ID Failure', props<{ error: string }>());



// update Customer Actions
export const updateCustomer = createAction('[Customer] update Customer', props<{ customer: Customer }>());
export const updateCustomerSuccess = createAction('[Customer] update Customer Success', props<{ message: string }>());
export const updateCustomerFailure = createAction('[Customer] update Customer Failure', props<{ error: string }>());






