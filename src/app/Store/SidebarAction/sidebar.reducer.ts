// Filename: sidebar.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { MenuItem } from '../../Shared/Models/Menu-item.model';
import * as MenuActions from './sidebar.action';

export interface MenuState {
  menu: MenuItem[];
  selectedMenuItem: MenuItem | null;
  error: any;
  loading: boolean;
}

export const initialState: MenuState = {
  menu: [],
  selectedMenuItem: null,
  error: null,
  loading: false
};

export const menuReducer = createReducer(
  initialState,
  on(MenuActions.getMenuItemById, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(MenuActions.getMenuItemByIdSuccess, (state, { menuItem }) => ({
    ...state,
    selectedMenuItem: menuItem,
    error: null,
    loading: false,
  })),
  on(MenuActions.getMenuItemByIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),


  // Inside menuReducer
  on(MenuActions.updateMenuItem, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(MenuActions.updateMenuItemSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    error: null
  })),
  on(MenuActions.updateMenuItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))

);



