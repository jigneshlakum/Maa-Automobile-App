import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule, DatePipe } from '@angular/common';
import { CarBooking, Service } from '../../../Shared/Models/car-booking.model';
import { __values } from 'tslib';
import * as BookingActions from '../../../Store/Car-Booking/car-booking.actions';
import * as CustomerActions from '../../../Store/CustomerAction/customer.actions';
import { selectAllCustomers } from '../../../Store/CustomerAction/customer.selectors';
import { NgSelectModule } from '@ng-select/ng-select';
import { map } from 'rxjs';
import { statusData } from '../../../Middleware/status-data';
import { selectBooking } from '../../../Store/Car-Booking/car-booking.selectors';
import { TosterService } from '../../../helperService/Toster/toster.service';
declare var $: any;


@Component({
  selector: 'app-add-and-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, NgSelectModule],
  templateUrl: './add-and-edit.component.html',
  styleUrls: ['./add-and-edit.component.css'],
  providers: [DatePipe]
})
export class AddAndEditComponent implements OnInit {
  customers$ = [];
  loading$: boolean = false;
  _btnLoading = false;
  _label = '';
  _pageTitle = '';
  bookingId: string | null = null;
  statusData = statusData;

  bookingForm: FormGroup = this.fb.group({
    id: [''],
    customerId: ['', Validators.required],
    start_date: ['', Validators.required],
    end_date: [{ value: '', disabled: true }],
    advance_payment: [0, Validators.min(0)],
    status: ['', Validators.required],
    kilometres: [, Validators.required],
    issue: ['', Validators.required],
    additional_requirements: [''],
    washing: [false],
    dentingPainting: [false],
    acwork: [false],
    electricwork: [false],
    brackdown: [false],
    rr: [false]
  });


  constructor(
    private fb: FormBuilder,
    private store: Store,
    private activateroute$: ActivatedRoute,
    private datePipe: DatePipe,
    private toster: TosterService
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

    // Edit
    this.activateroute$.queryParams.subscribe(params => {
      this.bookingId = params['id'];
      if (this.bookingId) {
        this.loading$ = true
        this.getByIdItems(this.bookingId);
      }
    });

  }


  private getByIdItems(id: string) {
    this.store.dispatch(BookingActions.getById({ id: id }));
    this.store.select(selectBooking).subscribe((state: any) => {
      const booking = state?.data;
      if (booking) {
        const formattedStartDate = this.datePipe.transform(booking.start_date, 'yyyy-MM-dd');
        this.bookingForm.patchValue({
          id: booking._id,
          customerId: booking.customerId,
          start_date: formattedStartDate,
          advance_payment: booking.advance_payment,
          status: booking.status,
          kilometres: booking.kilometres,
          issue: booking.issue,
          additional_requirements: booking.additional_requirements,
          washing: booking.services.some((s: any) => s.serviceType === 'Washing'),
          dentingPainting: booking.services.some((s: any) => s.serviceType === 'Denting & painting'),
          acwork: booking.services.some((s: any) => s.serviceType === 'Ac work'),
          electricwork: booking.services.some((s: any) => s.serviceType === 'Electricwork'),
          brackdown: booking.services.some((s: any) => s.serviceType === 'Brackdown'),
          rr: booking.services.some((s: any) => s.serviceType === 'RR')
        });
        this.loading$ = false;
      }
    });
  }

  onSubmit() {

    if (!this.bookingForm.value.customerId) {
      this.toster.error("select customer", "Error")
    }

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const formattedStartDate = this.datePipe.transform(this.bookingForm.value.start_date, 'yyyy-MM-dd');

    const services: Service[] = [
      { serviceType: 'Washing', isSelected: this.bookingForm.value.washing },
      { serviceType: 'Denting & painting', isSelected: this.bookingForm.value.dentingPainting },
      { serviceType: 'Ac work', isSelected: this.bookingForm.value.acwork },
      { serviceType: 'Electricwork', isSelected: this.bookingForm.value.electricwork },
      { serviceType: 'Brackdown', isSelected: this.bookingForm.value.brackdown },
      { serviceType: 'RR', isSelected: this.bookingForm.value.rr }
    ].filter(service => service.isSelected);

    const booking: CarBooking = {
      id: this.bookingId || '',
      customerId: this.bookingForm.value.customerId,
      start_date: formattedStartDate,
      end_date: formattedStartDate,
      advance_payment: this.bookingForm.value.advance_payment,
      status: this.bookingForm.value.status,
      kilometres: this.bookingForm.value.kilometres,
      issue: this.bookingForm.value.issue,
      additional_requirements: this.bookingForm.value.additional_requirements,
      services: services.map(service => ({
        serviceType: service.serviceType,
        isSelected: service.isSelected // Ensure this property is included
      }))
    };

    console.log({ booking });

    if (booking.id) {
      this.store.dispatch(BookingActions.updateData({ booking }));
    } else {
      this.store.dispatch(BookingActions.saveData({ booking }));
    }
  }
}