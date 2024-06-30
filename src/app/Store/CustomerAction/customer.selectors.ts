import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CustomerState } from './customer.reducer';

// Selector to get the customer state slice
export const selectCustomerState = createFeatureSelector<CustomerState>('customers');

// Selector to get all customers
export const selectAllCustomers = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.customers
);

// Selector to get loading state
export const selectLoading = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.loading
);

// Selector to get error state
export const selectCustomerError = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.error
);
