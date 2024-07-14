import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import * as CustomerActions from './customer.actions';
import { CustomerService } from '../../Services/Customer/customer.service';
import { TosterService } from '../../helperService/Toster/toster.service';
import { Router } from '@angular/router';

@Injectable()
export class CustomerEffects {

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomers),
      mergeMap(() =>
        this.customerService.getCustomers().pipe(
          map(response => {
            if (response.status) {
              return CustomerActions.loadCustomersSuccess({ customers: response.data });
            } else {
              return CustomerActions.loadCustomersFailure({ error: response.message });
            }
          }),
          catchError(error => of(CustomerActions.loadCustomersFailure({ error: error.message })))
        )
      )
    )
  );


  saveCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.saveCustomer),
      mergeMap(action =>
        this.customerService.saveCustomer(action.customer).pipe(
          map(response => {
            if (response.status) {
              this.toastr$.success(response.message,"Success");
              this.router$.navigate(['/customers']);
              return CustomerActions.saveCustomerSuccess({ message: response.message });
            } else {
              this.toastr$.error(response.message,"Error");
              this.router$.navigate(['/customers']);
              return CustomerActions.saveCustomerFailure({ error: response.message });
            }
          }),
          catchError(error => {
            this.toastr$.error(error.error.message,"Error");
            this.router$.navigate(['/customers']);
            return of(CustomerActions.saveCustomerFailure({ error: error.error.message }));
          })
        )
      )
    )
  );

  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.deleteCustomer),
      mergeMap(action =>
        this.customerService.deleteCustomer(action.id).pipe(
          map(response => {
            if (response.status) {
              this.toastr$.success(response.message,"Success");
              return CustomerActions.deleteCustomerSuccess({ id: action.id, message: response.message });
            } else {
              this.toastr$.error(response.message,"Error");
              return CustomerActions.deleteCustomerFailure({ error: response.message });
            }
          }),
          catchError(error => {
            this.toastr$.error(error.message,"Error");
            return of(CustomerActions.deleteCustomerFailure({ error: error.message }));
          })
        )
      ),
      switchMap(()=>[CustomerActions.loadCustomers()])
    )
  );

  getCustomerById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.getCustomerById),
      switchMap(action =>
        this.customerService.getCustomerById(action.id).pipe(
          map(customer => CustomerActions.getCustomerByIdSuccess({ customer })),
          catchError(error => of(CustomerActions.getCustomerByIdFailure({ error: error.message })))
        )
      )
    )
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.updateCustomer),
      mergeMap(action =>
        this.customerService.updateCustomer(action.customer).pipe(
          map(response => {
            if (response.status) {
              this.toastr$.success(response.message,"Success");
              this.router$.navigate(['/customers']);
              return CustomerActions.updateCustomerSuccess({ message: response.message });
            } else {
              this.toastr$.error(response.message,"Error");
              this.router$.navigate(['/customers']);
              return CustomerActions.updateCustomerFailure({ error: response.message });
            }
          }),
          catchError(error => {
            this.toastr$.error(error.message,"Error");
            this.router$.navigate(['/customers']);
            return of(CustomerActions.updateCustomerFailure({ error: error.message }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private toastr$: TosterService,
    private router$: Router,
  ) {}
  
}
