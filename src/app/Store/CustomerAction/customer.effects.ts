import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as CustomerActions from './customer.actions';
import { CustomerService } from '../../Services/Customer/customer.service';

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

  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) {}
  
}
