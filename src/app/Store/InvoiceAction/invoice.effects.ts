// src/app/Store/invoice/invoice.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import * as InvoiceActions from './invoice.actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { InvoiceService } from '../../Services/Invoice/invoice.service';
import { TosterService } from '../../helperService/Toster/toster.service';

@Injectable()
export class InvoiceEffects {

  loadInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.loadInvoices),
      mergeMap(() =>
        this.invoiceService.getInvoices().pipe(
          map(response => {
            if (response.status) {
              return InvoiceActions.loadInvoicesSuccess({ invoices: response.data });
            } else {
              this.toastr.error(response.message, 'Error');
              return InvoiceActions.loadInvoicesFailure({ error: response.message });
            }
          }),
          catchError(error => {
            this.toastr.error(error.message, 'Error');
            return of(InvoiceActions.loadInvoicesFailure({ error: error.message }));
          })
        )
      )
    )
  );

  saveInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.saveInvoice),
      mergeMap(action =>
        this.invoiceService.saveInvoice(action.invoice).pipe(
          map(response => {
            if (response.status) {
              this.toastr.success(response.message, 'Success');
              this.router.navigate(['/invoice']);
              return InvoiceActions.saveInvoiceSuccess({ message: response.message });
            } else {
              this.toastr.error(response.message, 'Error');
              return InvoiceActions.saveInvoiceFailure({ error: response.message });
            }
          }),
          catchError(error => {
            this.toastr.error(error.message, 'Error');
            return of(InvoiceActions.saveInvoiceFailure({ error: error.message }));
          })
        )
      )
    )
  );

  updateInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.updateInvoice),
      mergeMap(action =>
        this.invoiceService.updateInvoice(action.invoice).pipe(
          map(response => {
            if (response.status) {
              this.toastr.success(response.message, 'Success');
              this.router.navigate(['/invoice']);
              return InvoiceActions.updateInvoiceSuccess({ message: response.message });
            } else {
              this.toastr.error(response.message, 'Error');
              return InvoiceActions.updateInvoiceFailure({ error: response.message });
            }
          }),
          catchError(error => {
            this.toastr.error(error.message, 'Error');
            return of(InvoiceActions.updateInvoiceFailure({ error: error.message }));
          })
        )
      )
    )
  );

  deleteInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.deleteInvoice),
      mergeMap(action =>
        this.invoiceService.deleteInvoice(action.id).pipe(
          map(response => {
            if (response.status) {
              this.toastr.success(response.message, 'Success');
              return InvoiceActions.deleteInvoiceSuccess({ id: action.id, message: response.message });
            } else {
              this.toastr.error(response.message, 'Error');
              return InvoiceActions.deleteInvoiceFailure({ error: response.message });
            }
          }),
          catchError(error => {
            this.toastr.error(error.message, 'Error');
            return of(InvoiceActions.deleteInvoiceFailure({ error: error.message }));
          })
        )
      ),
      switchMap(() => [InvoiceActions.loadInvoices()])
    )
  );


  getInvoiceById$ = createEffect(() =>
    this.actions$.pipe(
        ofType(InvoiceActions.getInvoiceById),
      switchMap(action =>
        this.invoiceService.getInvoiceById(action.id).pipe(
          map(invoice => InvoiceActions.getInvoiceByIdSuccess({ invoice })),
          catchError(error => of(InvoiceActions.getInvoiceByIdFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService,
    private toastr: TosterService,
    private router: Router
  ) {}
}
