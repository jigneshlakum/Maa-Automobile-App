import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TosterService } from '../../helperService/Toster/toster.service';
import { Router } from '@angular/router';
import { loadEmployee, loadEmployeeFailure, loadEmployeeSuccess } from './employee.action';
import { EmployeeService } from '../../Services/Employee/employee.service';

@Injectable()
export class EmployeeEffects {


  constructor(
    private actions$: Actions,
    private employeeService$: EmployeeService,
    private _toster : TosterService,
    private _router: Router,
  ) {}


  loadEmployeeGroups$ = createEffect(() => this.actions$.pipe(
    ofType(loadEmployee),
    mergeMap(() => this.employeeService$.getAll().pipe(
      map((employeeItems:any) => loadEmployeeSuccess({ employeeItems })),
      catchError(error => of(loadEmployeeFailure({ error })))
    ))
  ));



}
