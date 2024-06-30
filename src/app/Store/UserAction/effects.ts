import { User } from './../../Shared/Models/UserModel';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { login, loginFailure, loginSuccess } from './actions';
import { AuthenticationService } from '../../Services/authentication.service';
import { TosterService } from '../../helperService/Toster/toster.service';
import { Router } from '@angular/router';
import { CryptoService } from '../../helperService/CryptoService/crypto.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private toastr: TosterService,
    private _router: Router,
    private $encryptionService: CryptoService // Inject the encryption service
  ) { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((action) => {
        const payload = { email: action.email, password: action.password };
        return this.authService.login(payload).pipe(
          map((user) => loginSuccess({ user })),
          catchError((error) =>
            of(loginFailure({ error: this.getErrorMessage(error) }))
          )
        );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          const _getToken = action.user.token;
          this.authService.setAuthToken(_getToken);
          this.toastr.success(action.user.message, 'Success');
          this._router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFailure),
        tap((action) => {
          this.toastr.error(action.error, 'Error');
        })
      ),
    { dispatch: false }
  );

  private getErrorMessage(error: any): string {
    if (error.error && error.error.message) {
      return error.error.message;
    } else if (error.message) {
      return error.message;
    } else {
      return 'An unknown error occurred';
    }
  }
}
