import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { CarBooking } from '../../../Shared/Models/car-booking.model';
import { __values } from 'tslib';
import { Customer } from '../../../Shared/Models/Customer.model';
import * as CustomerActions from '../../../Store/CustomerAction/customer.actions';
import { selectAllCustomers } from '../../../Store/CustomerAction/customer.selectors';

declare var $: any;

interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-add-and-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './add-and-edit.component.html',
  styleUrls: ['./add-and-edit.component.css']
})
export class AddAndEditComponent implements OnInit {
  customers$: Customer[] = [];
  loading$: boolean = false;
  _btnLoading = false;
  _label = '';
  _pageTitle = '';
  serviceItems = [{ value: 1, serviceName: '' }];


  bookingForm: FormGroup = this.fb.group({
    id: [''],
    customer: ['', Validators.required],
    start_date: ['', new Date(), Validators.required],
    end_date: [],
    advance_payment: [],
    status: ['', Validators.required],
    kilometres: [, Validators.required],
    mileage: ['', Validators.required],
    issue: ['', Validators.required],
    additional_requirements: [''],
    services: [],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private activateroute$: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this._pageTitle = this.activateroute$.snapshot.data['title'];
    this._label = this.activateroute$.snapshot.data['title'];

    this.store.dispatch(CustomerActions.loadCustomers());
    this.store.select(selectAllCustomers).subscribe((item) => {
      if (item && item.length > 0) {
        this.customers$ = item;
      }
    });
  }



  onServiceChange(index: number, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.serviceItems[index].serviceName = value;
  }

  addService(): void {
    const newItemValue = this.serviceItems.length + 1;
    this.serviceItems.push({ value: newItemValue, serviceName: '' });
  }

  removeService(index: number): void {
    this.serviceItems.splice(index, 1);
  }

  trackByIndex(index: number, item: any): number {
    return index; // or unique identifier if available
  }

  onSubmit() {
    console.log("carBooking", this.bookingForm.value, "--------", this.serviceItems);
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }
    const carBooking: CarBooking = this.bookingForm.value as CarBooking;

    // if (carBooking.id) {
    //   this.store.dispatch(CarBookingActions.updateCarBooking({ carBooking }));
    // } else {
    //   this.store.dispatch(CarBookingActions.saveCarBooking({ carBooking }));
    // }
  }
}
