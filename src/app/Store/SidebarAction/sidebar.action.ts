// Filename: sidebar.action.ts

import { createAction, props } from '@ngrx/store';
import { MenuItem } from '../../Shared/Models/Menu-item.model';

export const getMenuItemById = createAction(
  '[Menu] Get MenuItem By Id',
  props<{ UserGroupID: number }>()
);
export const getMenuItemByIdSuccess = createAction(
  '[Menu] Get MenuItem By Id Success',
  props<{ menuItem: MenuItem }>()
);
export const getMenuItemByIdFailure = createAction(
  '[Menu] Get MenuItem By Id Failure',
  props<{ error: any }>()
);


export const updateMenuItem = createAction(
  '[Menu] Update MenuItem',
  props<{ menuItem: Partial<MenuItem> }>()
);

export const updateMenuItemSuccess = createAction(
  '[Menu] Update MenuItem Success',
  props<{ message: string }>()
);

export const updateMenuItemFailure = createAction(
  '[Menu] Update MenuItem Failure',
  props<{ error: any }>()
);
