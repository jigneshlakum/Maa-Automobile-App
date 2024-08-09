// src/app/Store/invoice/invoice.selectors.ts

import { createSelector } from '@ngrx/store';
import { InvoiceState } from './invoice.reducer';

export const selectInvoiceState = (state: any) => state.invoice;

export const selectInvoices = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.invoices
);

export const selectSelectedInvoice = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.selectedInvoice
);

export const selectLoading = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.loading
);

export const selectError = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.error
);
