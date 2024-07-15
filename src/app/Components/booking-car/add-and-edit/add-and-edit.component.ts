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
  // serviceItems = [{ value: 1, serviceName: '', qty: "", servicePrice: "", total: "" }];
  statusData = statusData;

  bookingForm: FormGroup = this.fb.group({
    id: [''],
    customerId: ['', Validators.required],
    start_date: ['', new Date(), Validators.required],
    end_date: [{ value: '', disabled: true }],
    washing: [{ value: 'Washing', disabled: true }],
    washingPrice: [0, Validators.min(0)],
    dentingPainting: [{ value: 'Denting & painting', disabled: true }],
    dentingPaintingPrice: [0, Validators.min(0)],
    acwork: [{ value: 'Ac work', disabled: true }],
    acworkPrice: [0, Validators.min(0)],
    electricwork: [{ value: 'Electricwork', disabled: true }],
    electricworkPrice: [0, Validators.min(0)],
    brackdown: [{ value: 'Brackdown', disabled: true }],
    brackdownPrice: [0, Validators.min(0)],
    rr: [{ value: 'RR', disabled: true }],
    rrPrice: [0, Validators.min(0)],
    advance_payment: [0, Validators.min(0)],
    status: ['', Validators.required],
    kilometres: [, Validators.required],
    issue: ['', Validators.required],
    additional_requirements: [''],
    services: [],
  });


  constructor(
    private fb: FormBuilder,
    private store: Store,
    private activateroute$: ActivatedRoute,
    private datePipe: DatePipe
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

    // // edit
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
        this.bookingForm.patchValue({
          id: booking._id,
          customerId: booking.customerId,
          start_date: this.datePipe.transform(booking.start_date, 'yyyy-MM-dd'),
          end_date: booking.end_date ? new Date(booking.end_date) : '',
          washingPrice: booking.services.find((s: Service) => s.serviceType === 'Washing')?.price,
          dentingPaintingPrice: booking.services.find((s: Service) => s.serviceType === 'Denting & painting')?.price,
          acworkPrice: booking.services.find((s: Service) => s.serviceType === 'Ac work')?.price,
          electricworkPrice: booking.services.find((s: Service) => s.serviceType === 'Electricwork')?.price,
          brackdownPrice: booking.services.find((s: Service) => s.serviceType === 'Brackdown')?.price,
          rrPrice: booking.services.find((s: Service) => s.serviceType === 'RR')?.price,
          advance_payment: booking.advance_payment,
          status: booking.status,
          kilometres: booking.kilometres,
          issue: booking.issue,
          additional_requirements: booking.additional_requirements,
        });
        this.loading$ = false
      }
    });
  }


  // onServiceChange(index: number, event: Event): void {
  //   const value = (event.target as HTMLInputElement).value;
  //   this.serviceItems[index].serviceName = value;
  // }

  // onServicePriceChange(index: number, event: Event): void {
  //   const value = (event.target as HTMLInputElement).value;
  //   this.serviceItems[index].servicePrice = value;
  //   this.calculateTotal(index);
  // }

  // onServiceQtyChange(index: number, event: Event): void {
  //   const value = (event.target as HTMLInputElement).value;
  //   this.serviceItems[index].qty = value;
  //   this.calculateTotal(index);
  // }

  // calculateTotal(index: number): void {
  //   const price = parseFloat(this.serviceItems[index].servicePrice);
  //   const qty = parseFloat(this.serviceItems[index].qty);
  //   if (!isNaN(price) && !isNaN(qty)) {
  //     this.serviceItems[index].total = (price * qty).toFixed(2);
  //   } else {
  //     this.serviceItems[index].total = "";
  //   }
  // }

  // addService(): void {
  //   const newItemValue = this.serviceItems.length + 1;
  //   this.serviceItems.push({ value: newItemValue, qty: "", serviceName: '', servicePrice: '', total: "" });
  // }

  // removeService(index: number): void {
  //   this.serviceItems.splice(index, 1);
  // }

  trackByIndex(index: number, item: any): number {
    return index; // or unique identifier if available
  }

  onSubmit() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const formattedStartDate = this.datePipe.transform(this.bookingForm.value.start_date, 'dd-MM-yyyy');
    const formattedEndDate = this.datePipe.transform(this.bookingForm.value.end_date, 'dd-MM-yyyy');

    const services: Service[] = [
      {
        serviceType: 'Washing',
        price: this.bookingForm.value.washingPrice,
      },
      {
        serviceType: 'Denting & painting',
        price: this.bookingForm.value.dentingPaintingPrice,
      },
      {
        serviceType: 'Ac work',
        price: this.bookingForm.value.acworkPrice,
      },
      {
        serviceType: 'Electricwork',
        price: this.bookingForm.value.electricworkPrice,
      },
      {
        serviceType: 'Brackdown',
        price: this.bookingForm.value.brackdownPrice,
      },
      {
        serviceType: 'RR',
        price: this.bookingForm.value.rrPrice,
      },
    ];

    const booking: CarBooking = {
      id: this.bookingId || '',
      customerId: this.bookingForm.value.customerId,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      advance_payment: this.bookingForm.value.advance_payment,
      status: this.bookingForm.value.status,
      kilometres: this.bookingForm.value.kilometres,
      issue: this.bookingForm.value.issue,
      additional_requirements: this.bookingForm.value.additional_requirements,
      services: services,
    };

    console.log(booking);
    if (booking.id) {
      this.store.dispatch(BookingActions.updateData({ booking }));
    } else {
      this.store.dispatch(BookingActions.saveData({ booking }));
    }
  }
}
