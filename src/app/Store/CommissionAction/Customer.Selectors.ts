import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommissionStatus } from '../../Shared/Models/Commission.model';
import { CommissionAdopter } from './Commission.State';

const getCommissionState = createFeatureSelector<CommissionStatus>('commission');
const commissionSelectors = CommissionAdopter.getSelectors();

export const getcustomerlist = createSelector(
  getCommissionState,
  commissionSelectors.selectAll
);

export const getErrormessage = createSelector(
  getCommissionState,
  (state) => state.errormessage
);

export const isloading = createSelector(
  getCommissionState,
  (state) => state.isloading
);

