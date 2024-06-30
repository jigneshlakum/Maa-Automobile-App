import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as MenuActions from './sidebar.action';
import { MenuItem } from '../../Shared/Models/Menu-item.model';
import { MenuService } from '../../Services/SidebarMenu/menu.service';
import { TosterService } from '../../helperService/Toster/toster.service';

@Injectable()
export class MenuEffects {

  constructor(
    private actions$: Actions,
    private _menuService: MenuService,
    private _toastr : TosterService
  ) {}

  getMenuItemById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.getMenuItemById),
      mergeMap(action => this._menuService.getMenuItemById(action.UserGroupID)
        .pipe(
          map((menuItem: MenuItem) => MenuActions.getMenuItemByIdSuccess({ menuItem })),
          catchError(error => of(MenuActions.getMenuItemByIdFailure({ error })))
        ))
    )
  );

// Inside MenuEffects class
updateMenuItem$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MenuActions.updateMenuItem),
    mergeMap(action => {
      const { menuItem } = action;
      return this._menuService.updateMenuItem(menuItem).pipe(
        map(() => {
          this._toastr.success('Menu item updated successfully', 'Success');
          return MenuActions.updateMenuItemSuccess({ message: 'Menu item updated successfully' });
        }),
        catchError(error => {
          this._toastr.error(`Error updating menu item: ${error}`, 'Error');
          return of(MenuActions.updateMenuItemFailure({ error }));
        })
      );
    })
  )
);


}
