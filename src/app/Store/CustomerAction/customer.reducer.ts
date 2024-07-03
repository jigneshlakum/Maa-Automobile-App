import { createReducer, on } from '@ngrx/store';
import * as CustomerActions from './customer.actions';
import { Customer } from '../../Shared/Models/Customer.model';

export interface CustomerState {
  customers: Customer[];
  selectedCustomer: Customer | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CustomerState = {
  customers: [],
  selectedCustomer: null,
  loading: false,
  error: null
};

export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.loadCustomers, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CustomerActions.loadCustomersSuccess, (state, { customers }) => ({
    ...state,
    customers,
    loading: false,
    error: null
  })),
  on(CustomerActions.loadCustomersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Save Customer
  on(CustomerActions.saveCustomer, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CustomerActions.saveCustomerSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    error: null
  })),
  on(CustomerActions.saveCustomerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete Customer
  on(CustomerActions.deleteCustomer, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CustomerActions.deleteCustomerSuccess, (state, { id }) => ({
    ...state,
    customers: state.customers.filter(customer => customer.id !== id),
    loading: false,
    error: null
  })),
  on(CustomerActions.deleteCustomerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Get Customer by ID
  on(CustomerActions.getCustomerById, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CustomerActions.getCustomerByIdSuccess, (state, { customer }) => ({
    ...state,
    selectedCustomer: customer,
    loading: false,
    error: null
  })),
  on(CustomerActions.getCustomerByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // update Customer
  on(CustomerActions.updateCustomer, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CustomerActions.updateCustomerSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    error: null
  })),
  on(CustomerActions.updateCustomerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

);
