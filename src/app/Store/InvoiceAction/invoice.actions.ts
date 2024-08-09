// src/app/Store/invoice/invoice.actions.ts

import { createAction, props } from '@ngrx/store';
import { InvoiceModel } from '../../Shared/Models/Invoice.model';

// Actions for loading invoices
export const loadInvoices = createAction('[Invoice] Load Invoices');
export const loadInvoicesSuccess = createAction('[Invoice] Load Invoices Success', props<{ invoices: InvoiceModel[] }>());
export const loadInvoicesFailure = createAction('[Invoice] Load Invoices Failure', props<{ error: any }>());

// Actions for getting an invoice by ID
export const getInvoiceById = createAction('[Invoice] Get Invoice By ID', props<{ id: string }>());
export const getInvoiceByIdSuccess = createAction('[Invoice] Get Invoice By ID Success', props<{ invoice: InvoiceModel }>());
export const getInvoiceByIdFailure = createAction('[Invoice] Get Invoice By ID Failure', props<{ error: any }>());

// Actions for saving an invoice
export const saveInvoice = createAction('[Invoice] Save Invoice', props<{ invoice: InvoiceModel }>());
export const saveInvoiceSuccess = createAction('[Invoice] Save Invoice Success', props<{ message: string }>());
export const saveInvoiceFailure = createAction('[Invoice] Save Invoice Failure', props<{ error: any }>());

// Actions for updating an invoice
export const updateInvoice = createAction('[Invoice] Update Invoice', props<{ invoice: InvoiceModel }>());
export const updateInvoiceSuccess = createAction('[Invoice] Update Invoice Success', props<{ message: string }>());
export const updateInvoiceFailure = createAction('[Invoice] Update Invoice Failure', props<{ error: any }>());

// Actions for deleting an invoice
export const deleteInvoice = createAction('[Invoice] Delete Invoice', props<{ id: string }>());
export const deleteInvoiceSuccess = createAction('[Invoice] Delete Invoice Success', props<{ id: string, message: string }>());
export const deleteInvoiceFailure = createAction('[Invoice] Delete Invoice Failure', props<{ error: any }>());
