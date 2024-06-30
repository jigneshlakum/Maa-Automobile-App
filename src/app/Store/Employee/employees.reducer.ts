import { createReducer, on,Action } from "@ngrx/store";
import { EmployeeModel } from "../../Shared/Models/Employee";
import { loadEmployee, loadEmployeeFailure, loadEmployeeSuccess } from "./employee.action";


export interface EmployeeState {
  employeeItems: EmployeeModel[];
  loading: boolean;
  error: any;
  message: string;
  selectedEmployeeGroup: EmployeeModel | null; // Changed to null
}

export const initialState: EmployeeState = {
  employeeItems: [],
  loading: false,
  error: null,
  message: '',
  selectedEmployeeGroup: null
};



const _employeeReducer = createReducer(
  initialState,
  on(loadEmployee, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadEmployeeSuccess, (state, { employeeItems }) => ({
    ...state,
    loading: false,
    employeeItems
  })),
  on(loadEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),


)

export function employeeReducer(state: EmployeeState | undefined, action: Action) {
  return _employeeReducer(state, action);
}
