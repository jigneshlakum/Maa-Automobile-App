import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { AddAndEditComponent } from './add-and-edit/add-and-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', data: { title: "Booking List" }, component: ListingComponent },
  { path: 'add', data: { title: "Create" }, component: AddAndEditComponent },
  { path: 'edit', data: { title: "Update" }, component: AddAndEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingCarRoutingModule { }
