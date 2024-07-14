import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { CarBooking } from '../../../Shared/Models/car-booking.model';
import { __values } from 'tslib';
import * as BookingActions from '../../../Store/Car-Booking/car-booking.actions';
import * as CustomerActions from '../../../Store/CustomerAction/customer.actions';
import { selectAllCustomers } from '../../../Store/CustomerAction/customer.selectors';
import { NgSelectModule } from '@ng-select/ng-select';
import { map } from 'rxjs';
import { statusData } from '../../../Middleware/status-data';
declare var $: any;


@Component({
  selector: 'app-add-and-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, NgSelectModule],
  templateUrl: './add-and-edit.component.html',
  styleUrls: ['./add-and-edit.component.css']
})
export class AddAndEditComponent implements OnInit {
  customers$ = [];
  loading$: boolean = false;
  _btnLoading = false;
  _label = '';
  _pageTitle = '';
  serviceItems = [{ value: 1, serviceName: '', qty: "", servicePrice: "", total: "" }];
  statusData = statusData;

  bookingForm: FormGroup = this.fb.group({
    customerId: ['', Validators.required],
    start_date: ['', new Date(), Validators.required],
    end_date: [{ value: '', disabled: true }],
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
    private activateroute$: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this._pageTitle = this.activateroute$.snapshot.data['title'];
    this._label = this.activateroute$.snapshot.data['title'];

    this.store.dispatch(CustomerActions.loadCustomers());
    this.store.select(selectAllCustomers).pipe(
      map((customers: any) => customers.map((customer: any) => ({
        id: customer._id,
        name: customer.customerName
      })))
    ).subscribe((formattedCustomers) => {
      this.customers$ = formattedCustomers;
    });

    // // exit
    // this.activateroute$.queryParams.subscribe(params => {
    //   this.customerId = params['id'];
    //   if (this.customerId) {
    //     this.loading$ = true
    //     this.getCustomerById(this.customerId);
    //   }
    // });


  }


  onServiceChange(index: number, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.serviceItems[index].serviceName = value;
  }

  onServicePriceChange(index: number, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.serviceItems[index].servicePrice = value;
    this.calculateTotal(index);
  }

  onServiceQtyChange(index: number, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.serviceItems[index].qty = value;
    this.calculateTotal(index);
  }

  calculateTotal(index: number): void {
    const price = parseFloat(this.serviceItems[index].servicePrice);
    const qty = parseFloat(this.serviceItems[index].qty);
    if (!isNaN(price) && !isNaN(qty)) {
      this.serviceItems[index].total = (price * qty).toFixed(2);
    } else {
      this.serviceItems[index].total = "";
    }
  }

  addService(): void {
    const newItemValue = this.serviceItems.length + 1;
    this.serviceItems.push({ value: newItemValue, qty: "", serviceName: '', servicePrice: '', total: "" });
  }

  removeService(index: number): void {
    this.serviceItems.splice(index, 1);
  }

  trackByIndex(index: number, item: any): number {
    return index; // or unique identifier if available
  }

  onSubmit() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const booking: CarBooking = {
      id: '',
      customerId: this.bookingForm.value.customerId,
      start_date: this.bookingForm.value.start_date,
      end_date: "",
      advance_payment: this.bookingForm.value.advance_payment,
      status: this.bookingForm.value.status,
      kilometres: this.bookingForm.value.kilometres,
      mileage: this.bookingForm.value.mileage,
      issue: this.bookingForm.value.issue,
      additional_requirements: this.bookingForm.value.additional_requirements,
      services: this.serviceItems
    };

    console.log("carBooking", booking);
    // if (carBooking.id) {
    //   this.store.dispatch(CarBookingActions.updateCarBooking({ carBooking }));
    // } else {
    this.store.dispatch(BookingActions.saveData({ booking }));
    // }
  }
}
