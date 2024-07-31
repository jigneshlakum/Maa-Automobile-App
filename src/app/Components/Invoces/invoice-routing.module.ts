import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingInvoicesComponent } from './listing-invoices/listing-invoices.component';
import { CreateinvoiceComponent } from './createinvoice/createinvoice.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', data: { title: "Invoices " }, component: ListingInvoicesComponent },
  { path: 'create', data: { title: "Create Invoice" }, component: CreateinvoiceComponent },
  // { path: 'edit', data: { title: "Update" }, component: AddAndEditComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
