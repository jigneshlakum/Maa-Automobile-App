// employees-group.reducer.ts

import { createReducer, on, Action } from '@ngrx/store';
import * as EmployeeGroupActions from './employees-group.actions';
import { EmployeeGroupModel } from '../../Shared/Models/Employee-group';

export interface EmployeeGroupState {
  employeeGroups: EmployeeGroupModel[];
  loading: boolean;
  error: any;
  message: string;
  selectedEmployeeGroup: EmployeeGroupModel | null; // Changed to null
}

export const initialState: EmployeeGroupState = {
  employeeGroups: [],
  loading: false,
  error: null,
  message: '',
  selectedEmployeeGroup: null
};

const _employeeGroupReducer = createReducer(
  initialState,
  on(EmployeeGroupActions.loadEmployeeGroups, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EmployeeGroupActions.loadEmployeeGroupsSuccess, (state, { employeeGroups }) => ({
    ...state,
    loading: false,
    employeeGroups
  })),
  on(EmployeeGroupActions.loadEmployeeGroupsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  //  add new
  on(EmployeeGroupActions.createEmployeeGroup, state => ({
    ...state,
    loading: true,
    error: null,
    message: ''
  })),
  on(EmployeeGroupActions.createEmployeeGroupSuccess, (state, { data, message }) => ({
    ...state,
    employeeGroups: [...state.employeeGroups, data],
    loading: false,
    message
  })),
  on(EmployeeGroupActions.createEmployeeGroupFailure, (state, { message }) => ({
    ...state,
    error: true,
    loading: false,
    message
  })),

  //delete
  on(EmployeeGroupActions.deleteEmployeeGroup, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EmployeeGroupActions.deleteEmployeeGroupSuccess, (state, { id }) => ({
    ...state,
    employeeGroups: state.employeeGroups.filter(group => group.UserGroupID !== id),
    loading: false
  })),
  on(EmployeeGroupActions.deleteEmployeeGroupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),


//  edit
on(EmployeeGroupActions.getEmployeeGroupByIdSuccess, (state, { employeeGroup }) => ({
  ...state,
  selectedEmployeeGroup: employeeGroup,
  error: null
})),

on(EmployeeGroupActions.getEmployeeGroupByIdFailure, (state, { error }) => ({
  ...state,
  selectedEmployeeGroup: null,
  error
}))


);

export function employeeGroupReducer(state: EmployeeGroupState | undefined, action: Action) {
  return _employeeGroupReducer(state, action);
}
