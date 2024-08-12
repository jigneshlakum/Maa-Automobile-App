import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TosterService } from '../../../helperService/Toster/toster.service';
import * as CustomerActions from '../../../Store/CustomerAction/customer.actions';
import { selectCustomer } from '../../../Store/CustomerAction/customer.selectors';
import { Customer } from '../../../Shared/Models/Customer.model';
import { InvoiceModel } from '../../../Shared/Models/Invoice.model';
import * as InvoiceActions from '../../../Store/InvoiceAction/invoice.actions';
import { selectInvoices, selectSelectedInvoice } from '../../../Store/InvoiceAction/invoice.selectors';


@Component({
  selector: 'app-createinvoice',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './createinvoice.component.html',
  styleUrl: './createinvoice.component.css',
  providers: [DatePipe]
})
export class CreateinvoiceComponent {
  loading$: boolean = false;
  _label = '';
  _pageTitle = '';
  _currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  dueDate = new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString();
  invoiceNumber$: string = '';
  customerId: string | null = null;
  invoiceID: string | null = null;
  invoiceEditID: string | null = null;
  customerDtails: Customer | null = null;
  invoiceDtails: InvoiceModel | null = null;
  _btnLoading = false;

  discount = 0;

  invoiceItems = [
    { description: '', quantity: 1, unitPrice: 0, total: 0 }
  ];


  constructor(
    private fb: FormBuilder,
    private store: Store,
    private activateroute$: ActivatedRoute,
    private datePipe: DatePipe,
    private toster: TosterService,
  ) { }



  ngOnInit(): void {
    this._pageTitle = this.activateroute$.snapshot.data['title'];
    this._label = this.activateroute$.snapshot.data['title'];

    this.activateroute$.queryParams.subscribe(params => {
      this.customerId = params['invoiceId'];
      if (this.customerId) {
        this.loading$ = true
        this.getCustomerById(this.customerId);
      }
    });

    // Edit
    this.activateroute$.queryParams.subscribe(params => {
      this.invoiceID = params['id'];
      if (this.invoiceID) {
        this.loading$ = true
        this.getInvoiceById(this.invoiceID);
      }
    });

  }

  // getBy getInvoiceById edit
  private getInvoiceById(id: string) {
    this.store.dispatch(InvoiceActions.getInvoiceById({ id: id }));
    this.store.select(selectSelectedInvoice).subscribe((state: any) => {
      const InvoiceID = state?.data;
      console.log(state.data);
      if (state?.data?._id && InvoiceID) {
        this.customerId = state?.data.customerId
        this.getCustomerById(state?.data.customerId);
        this.invoiceDtails = state?.data
        this.invoiceEditID = state?.data._id
        this.invoiceNumber$ = state?.data.invoiceNumber
        this.invoiceItems = state.data.InvoiceItems.map((item: any) => ({
          description: item.description || '',
          quantity: item.quantity || 1,
          unitPrice: item.unitPrice || 0,
          total: item.total || 0,
        }));
        this.loading$ = false
      }
    });
  }

  // getBy customer
  private getCustomerById(id: string) {
    this.store.dispatch(CustomerActions.getCustomerById({ id: id }));
    this.store.select(selectCustomer).subscribe((state: any) => {
      const customer = state?.data;
      if (state?.data?.vehicleNumber && customer) {
        this.customerDtails = state?.data
        this.loading$ = false
      }
    });
  }


  get finalAmount() {
    return this.invoiceItems.reduce((sum, item) => sum + item.total, 0);
  }

  addItem() {
    this.invoiceItems.push({ description: '', quantity: 1, unitPrice: 0, total: 0 });
  }

  removeItem(index: number) {
    this.invoiceItems.splice(index, 1);
  }

  updateTotal(index: number) {
    const item = this.invoiceItems[index];
    item.total = item.quantity * item.unitPrice;
  }

  async saveInvoice() {
    this.loading$ = true
    const invoiceData = {
      customerId: this.customerId ?? '',
      id: this.invoiceEditID,
      invoiceNumber: this.invoiceNumber$,
      date: this._currentDate ?? '',
      finalAmount: this.finalAmount,
      InvoiceItems: this.invoiceItems && this.invoiceItems.length > 0 ? this.invoiceItems : []
    };
    if (invoiceData.id && this.invoiceEditID) {
      await this.store.dispatch(InvoiceActions.updateInvoice({ invoice: invoiceData }));
    }
    else {
      await this.store.dispatch(InvoiceActions.saveInvoice({ invoice: invoiceData }));
    }
  }
}
