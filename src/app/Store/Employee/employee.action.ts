import { createAction, props } from "@ngrx/store";
import { EmployeeModel } from "../../Shared/Models/Employee";




export const loadEmployee = createAction(
  '[Employee ] Load Employee '
);

export const loadEmployeeSuccess = createAction(
  '[Employee ] Load Employee  Success',
  props<{ employeeItems: EmployeeModel[] }>()
);

export const loadEmployeeFailure = createAction(
  '[Employee ] Load Employee Groups Failure',
  props<{ error: any }>()
);
