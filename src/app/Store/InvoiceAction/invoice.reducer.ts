// src/app/Store/invoice/invoice.reducer.ts

import { createReducer, on, Action } from '@ngrx/store';
import * as InvoiceActions from './invoice.actions';
import { InvoiceModel } from '../../Shared/Models/Invoice.model';

export interface InvoiceState {
  invoices: InvoiceModel[];
  selectedInvoice: InvoiceModel | null;
  loading: boolean;
  error: any;
}

export const initialState: InvoiceState = {
  invoices: [],
  selectedInvoice: null,
  loading: false,
  error: null
};

export const invoiceReducer = createReducer(
  initialState,
  on(InvoiceActions.loadInvoices, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(InvoiceActions.loadInvoicesSuccess, (state, { invoices }) => ({
    ...state,
    invoices,
    loading: false,
    error: null
  })),
  on(InvoiceActions.loadInvoicesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(InvoiceActions.getInvoiceById, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(InvoiceActions.getInvoiceByIdSuccess, (state, { invoice }) => ({
    ...state,
    selectedInvoice: invoice,
    loading: false,
    error: null
  })),
  on(InvoiceActions.getInvoiceByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(InvoiceActions.saveInvoice, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(InvoiceActions.saveInvoiceSuccess, state => ({
    ...state,
    loading: false,
    error: null
  })),
  on(InvoiceActions.saveInvoiceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(InvoiceActions.updateInvoice, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(InvoiceActions.updateInvoiceSuccess, state => ({
    ...state,
    loading: false,
    error: null
  })),
  on(InvoiceActions.updateInvoiceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(InvoiceActions.deleteInvoice, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(InvoiceActions.deleteInvoiceSuccess, (state, { id }) => ({
    ...state,
    invoices: state.invoices.filter(i => i.invoiceNumber !== id),
    loading: false,
    error: null
  })),
  on(InvoiceActions.deleteInvoiceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

export function reducer(state: InvoiceState | undefined, action: Action) {
  return invoiceReducer(state, action);
}
