import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EmployeeGroupState } from './employees-group.reducer';

export const selectEmployeeGroupState = createFeatureSelector<EmployeeGroupState>('employeeGroup');

export const selectAllEmployeeGroups = createSelector(
  selectEmployeeGroupState,
  (state: EmployeeGroupState) => state.employeeGroups
);

export const selectLoading = createSelector(
  selectEmployeeGroupState,
  (state: EmployeeGroupState) => state.loading
);

export const selectEmployeeGroupError = createSelector(
  selectEmployeeGroupState,
  (state: EmployeeGroupState) => state.error
);


