// Filename: sidebar.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuState } from './sidebar.reducer';

export const selectMenuState = createFeatureSelector<MenuState>('menu');

export const selectMenu = createSelector(
  selectMenuState,
  (state: MenuState) => state.menu
);

export const selectSelectedMenuItem = createSelector(
  selectMenuState,
  (state: MenuState) => state.selectedMenuItem
);

export const selectMenuError = createSelector(
  selectMenuState,
  (state: MenuState) => state.error
);

export const selectLoading = createSelector(
  selectMenuState,
  (state: MenuState) => state.loading
);
