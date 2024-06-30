import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, of, map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  deleteCOMMISSIONS,
  deleteCUSTOMERsuccess,
  loadCOMMISSIONS,
  loadCOMMISSIONSfail,
  loadCOMMISSIONSsuccess,
} from './Commission.Action';
import { CommissionServiceService } from '../../Services/CommissionService/commission.service.service';
import { CommissionModel } from '../../Shared/Models/Commission.model';
import { TosterService } from '../../helperService/Toster/toster.service';

@Injectable()
export class CommissionEffects {
  constructor(
    private actions$: Actions,
    private _commissionService: CommissionServiceService,
    private store: Store,
    private toastr: TosterService
  ) {}

  _loadCommission = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCOMMISSIONS),
      exhaustMap((action) => {
        return this._commissionService.GetAll().pipe(
          map((response: any) => {
            if (response && response.users) {
              return loadCOMMISSIONSsuccess({ list: response.users });
            } else {
              return loadCOMMISSIONSfail({
                errormessage: 'Invalid response format',
              });
            }
          }),
          catchError((_error) => {
            return of(loadCOMMISSIONSfail({ errormessage: _error.message }));
          })
        );
      })
    )
  );

  _deleteCUSTOMER = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCOMMISSIONS),
      switchMap((action) => {
        return this._commissionService.Delete(action.id).pipe(
          switchMap(() => {
            this.toastr.success('Delete Successful!', 'Success');
            return of(deleteCUSTOMERsuccess({ id: action.id }));
          }),
          catchError((_error) => {
            this.toastr.error('Failed to delete CUSTOMER ' + _error, 'Error');
            return of();
          })
        );
      })
    )
  );
}
