import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EmployeeState } from './employees.reducer';

export const selectEmployeeState = createFeatureSelector<EmployeeState>('employeeItems');

export const selectAllEmployee = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.employeeItems
);

export const selectLoading = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.loading
);

export const selectEmployeeGroupError = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.error
);


