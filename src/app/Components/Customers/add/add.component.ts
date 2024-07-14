import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Customer } from '../../../Shared/Models/Customer.model';
import * as CustomerActions from '../../../Store/CustomerAction/customer.actions';
import { selectCustomer } from '../../../Store/CustomerAction/customer.selectors';

declare var $: any; // Declare jQuery

@Component({
  selector: 'app-add',
  standalone: true,
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  imports: [RouterLink, ReactiveFormsModule],
})
export class AddComponent implements OnInit {
  loading$: boolean = false;
  _btnLoading: boolean = false;
  _label: string = '';
  _pageTitle: string = '';
  customerId: string | null = null;

  customerForm = this.builder.group({
    id: [0],
    vehicleNumber: ['', Validators.required],
    customerName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobileNumber: ['', [Validators.required]],
    city: ['', [Validators.required]],
    brandName: ['', [Validators.required]],
    modelName: ['', [Validators.required]],
    fullAddress: [''],
    createdAt: [new Date().toISOString()]
  });

  constructor(
    private builder: FormBuilder,
    private store: Store,
    private activateroute$: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._pageTitle = this.activateroute$.snapshot.data['title'];
    this._label = this.activateroute$.snapshot.data['title'];

    this.activateroute$.queryParams.subscribe(params => {
      this.customerId = params['id'];
      if (this.customerId) {
        this.loading$ = true
        this.getCustomerById(this.customerId);
      }
    });

    // Initialize niceSelect after view is initialized
    $(document).ready(() => {
      $('select').niceSelect();
    });
  }

  uppercaseValidator(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && typeof control.value === 'string') {
      const uppercasedValue = control.value.toUpperCase();
      if (control.value !== uppercasedValue) {
        control.setValue(uppercasedValue);
      }
    }
    return null;
  }

  private getCustomerById(id: string) {
   
    this.store.dispatch(CustomerActions.getCustomerById({ id: id }));

    this.store.select(selectCustomer).subscribe((state: any) => {
      const customer = state?.data;
      if (state?.data.vehicleNumber) {
        this.customerForm.patchValue({
          id: state?.data._id,
          vehicleNumber: state?.data.vehicleNumber,
          customerName: customer.customerName,
          email: customer.email,
          mobileNumber: customer.mobileNumber,
          city: customer.city,
          brandName: customer.brandName,
          modelName: customer.modelName,
          fullAddress: customer.fullAddress,
          // carService: customer.carService,
        });
        this.loading$ = false
      }
    });
  }

  onSubmit() {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }
    this._btnLoading = true
    const customer: Customer = this.customerForm.value as Customer;
    if (customer.id) {
      this.store.dispatch(CustomerActions.updateCustomer({ customer }));
    } else {
      this.store.dispatch(CustomerActions.saveCustomer({ customer }));
    }
  }
}
