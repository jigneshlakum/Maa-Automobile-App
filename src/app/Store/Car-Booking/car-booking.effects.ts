import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import * as BookingActions from './car-booking.actions';
import { TosterService } from '../../helperService/Toster/toster.service';
import { Router } from '@angular/router';
import { BookingService } from '../../Services/BookingService/booking.service';

@Injectable()
export class BookingEffects {

  constructor(
    private actions$: Actions,
    private bookingService: BookingService,
    private toastr$: TosterService,
    private router$: Router,
  ) { }

  loadAllData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.loadData),
      mergeMap(({ selectedDate }) =>
        this.bookingService.getAll(selectedDate).pipe(
          map(response => {
            if (response.status) {
              return BookingActions.loadDataSuccess({ bookings: response.data });
            } else {
              return BookingActions.loadDataFailure({ error: response.message });
            }
          }),
          catchError(error => of(BookingActions.loadDataFailure({ error: error.message })))
        )
      )
    )
  );


  saveData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.saveData),
      mergeMap(action =>
        this.bookingService.saveData(action.booking).pipe(
          map(response => {
            if (response.status) {
              this.toastr$.success(response.message, "Success");
              this.router$.navigate(['/booking']);
              return BookingActions.saveDataSuccess({ message: response.message });
            } else {
              this.toastr$.error(response.message, "Error");
              return BookingActions.saveDataFailure({ error: response.message });
            }
          }),
          catchError(error => {
            this.toastr$.error(error.message, "Error");
            return of(BookingActions.saveDataFailure({ error: error.message }));
          })
        )
      )
    )
  );

  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.deleteData),
      mergeMap(action =>
        this.bookingService.deleteData(action.id).pipe(
          map(response => {
            if (response.status) {
              this.toastr$.success(response.message, "Success");
              return BookingActions.deleteDataSuccess({ id: action.id, message: response.message });
            } else {
              this.toastr$.error(response.message, "Error");
              return BookingActions.deleteDataFailure({ error: response.message });
            }
          }),
          catchError(error => {
            this.toastr$.error(error.message, "Error");
            return of(BookingActions.deleteDataFailure({ error: error.message }));
          })
        )
      ),
      switchMap(() => [BookingActions.loadData({ selectedDate: null })])
    )
  );

  getById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.getById),
      switchMap(action =>
        this.bookingService.getById(action.id).pipe(
          map(booking => BookingActions.getByIdSuccess({ booking })),
          catchError(error => of(BookingActions.getByIdFailure({ error: error.message })))
        )
      )
    )
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.updateData),
      mergeMap(action =>
        this.bookingService.updateData(action.booking).pipe(
          map(response => {
            if (response.status) {
              this.toastr$.success(response.message, "Success");
              this.router$.navigate(['/booking']);
              return BookingActions.updateDataSuccess({ message: response.message });
            } else {
              this.toastr$.error(response.message, "Error");
              return BookingActions.updateDataFailure({ error: response.message });
            }
          }),
          catchError(error => {
            this.toastr$.error(error.message, "Error");
            return of(BookingActions.updateDataFailure({ error: error.message }));
          })
        )
      )
    )
  );
}
