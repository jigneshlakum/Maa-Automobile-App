import { createReducer, on } from '@ngrx/store';
import * as CustomerActions from './customer.actions';
import { Customer } from '../../Shared/Models/Customer.model';

export interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
}

export const initialState: CustomerState = {
  customers: [],
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
  }))
);
