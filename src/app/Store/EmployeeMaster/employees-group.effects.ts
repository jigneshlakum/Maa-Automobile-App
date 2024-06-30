import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap, tap } from 'rxjs/operators';
import * as EmployeeGroupActions from './employees-group.actions';
import { EmployeeGroupService } from '../../Services/EmployeeGroup/employee-group.service';
import { of } from 'rxjs';
import { TosterService } from '../../helperService/Toster/toster.service';
import { Router } from '@angular/router';

@Injectable()
export class EmployeeGroupEffects {


  constructor(
    private actions$: Actions,
    private employeeGroupService: EmployeeGroupService,
    private _toster : TosterService,
    private _router: Router,
  ) {}


  loadEmployeeGroups$ = createEffect(() => this.actions$.pipe(
    ofType(EmployeeGroupActions.loadEmployeeGroups),
    mergeMap(() => this.employeeGroupService.getAll().pipe(
      map(employeeGroups => EmployeeGroupActions.loadEmployeeGroupsSuccess({ employeeGroups })),
      catchError(error => of(EmployeeGroupActions.loadEmployeeGroupsFailure({ error })))
    ))
  ));

  // new add
  createEmployeeGroup$ = createEffect(() => this.actions$.pipe(
    ofType(EmployeeGroupActions.createEmployeeGroup),
    mergeMap(action => this.employeeGroupService.create(action.employeeGroup).pipe(
      map(response => {
        if (response.status) {
          this._toster.success(response.message,"Success");
          this._router.navigate(['/user/employee-group']);
          return EmployeeGroupActions.createEmployeeGroupSuccess({
            status: response.status,
            message: response.message,
            data: response.data
          });
        } else {
          this._toster.error(response.message,"Error");
          return EmployeeGroupActions.createEmployeeGroupFailure({
            status: response.status,
            message: response.message
          });
        }
      }),
      catchError(error => {
        this._toster.error('An error occurred',"Error");
        return of(EmployeeGroupActions.createEmployeeGroupFailure({
          status: false,
          message: 'An error occurred'
        }));
      })
    ))
  ));

  // deleted
  deleteEmployeeGroup$ = createEffect(() => this.actions$.pipe(
    ofType(EmployeeGroupActions.deleteEmployeeGroup),
    mergeMap(action => this.employeeGroupService.delete(action.id).pipe(
      map(response => EmployeeGroupActions.deleteEmployeeGroupSuccess({ id: action.id, message: response.message })),
      catchError(error => of(EmployeeGroupActions.deleteEmployeeGroupFailure({ error, message: error.message || 'Failed to delete employee group!' })))
    ))
  ));

  // edit
  getEmployeeGroupById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeGroupActions.getEmployeeGroupById),
      mergeMap(action =>
        this.employeeGroupService.getEmployeeGroupById(action.id).pipe(
          map(employeeGroup => {
            if (employeeGroup !== null) {
              return EmployeeGroupActions.getEmployeeGroupByIdSuccess({ employeeGroup });
            } else {
              return EmployeeGroupActions.getEmployeeGroupByIdFailure({ error: 'Employee group not found' });
            }
          }),
          catchError(error => of(EmployeeGroupActions.getEmployeeGroupByIdFailure({ error })))
        )
      )
    )
  );



  showSuccessMessage$ = createEffect(() => this.actions$.pipe(
    ofType(EmployeeGroupActions.deleteEmployeeGroupSuccess),
    tap(action => {
      this._toster.success(action.message,"Success");
    })
  ), { dispatch: false });

  showErrorMessage$ = createEffect(() => this.actions$.pipe(
    ofType(EmployeeGroupActions.deleteEmployeeGroupFailure),
    tap(action => {
      this._toster.error(action.message,"Error");
    })
  ), { dispatch: false });


}
