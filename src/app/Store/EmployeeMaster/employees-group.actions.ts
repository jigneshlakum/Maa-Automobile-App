import { createAction, props } from '@ngrx/store';
import { EmployeeGroupModel } from '../../Shared/Models/Employee-group';

export const loadEmployeeGroups = createAction(
  '[Employee Groups] Load Employee Groups'
);

export const loadEmployeeGroupsSuccess = createAction(
  '[Employee Groups] Load Employee Groups Success',
  props<{ employeeGroups: EmployeeGroupModel[] }>()
);

export const loadEmployeeGroupsFailure = createAction(
  '[Employee Groups] Load Employee Groups Failure',
  props<{ error: any }>()
);

// new create
export const createEmployeeGroup = createAction(
  '[Employee Groups] Create Employee Group',
  props<{ employeeGroup: EmployeeGroupModel }>()
);

export const createEmployeeGroupSuccess = createAction(
  '[Employee Groups] Create Employee Group Success',
  props<{ status: boolean; message: string; data: EmployeeGroupModel }>()
);

export const createEmployeeGroupFailure = createAction(
  '[Employee Groups] Create Employee Group Failure',
  props<{ status: boolean; message: string }>()
);

// deleted
export const deleteEmployeeGroup = createAction(
  '[Employee Groups] Delete Employee Group',
  props<{ id: number }>()
);

export const deleteEmployeeGroupSuccess = createAction(
  '[Employee Groups] Delete Employee Group Success',
  props<{ id: number; message: string }>()
);

export const deleteEmployeeGroupFailure = createAction(
  '[Employee Groups] Delete Employee Group Failure',
  props<{ error: any; message: string }>()
);


// edit
// Action to get a single employee group by ID
export const getEmployeeGroupById = createAction(
  '[Employee Group] Get Employee Group By ID',
  props<{ id: number }>()
);

// Action to store the fetched employee group in the store
export const getEmployeeGroupByIdSuccess = createAction(
  '[Employee Group] Get Employee Group By ID Success',
  props<{ employeeGroup: EmployeeGroupModel }>()
);

export const getEmployeeGroupByIdFailure = createAction(
  '[Employee Group] Get Employee Group By ID Failure',
  props<{ error: any }>()
);

// deleted
export const editEmployeeGroup = createAction(
  '[Employee Groups] Edit Employee Group',
  props<{ id: number }>()
);

export const editEmployeeGroupSuccess = createAction(
  '[Employee Groups] Edit Employee Group Success',
  props<{ id: number; message: string }>()
);

export const editEmployeeGroupFailure = createAction(
  '[Employee Groups] Edit Employee Group Failure',
  props<{ error: any; message: string }>()
);
