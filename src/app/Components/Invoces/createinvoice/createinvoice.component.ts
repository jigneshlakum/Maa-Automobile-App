import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TosterService } from '../../../helperService/Toster/toster.service';
import { GenerateInvoiceNumberService } from '../../../helperService/GenerateInvoiceNumber/generate-invoice-number.service';
import * as CustomerActions from '../../../Store/CustomerAction/customer.actions';
import { selectCustomer } from '../../../Store/CustomerAction/customer.selectors';
import { Customer } from '../../../Shared/Models/Customer.model';
import { InvoiceModel } from '../../../Shared/Models/Invoice.model';
import * as InvoiceActions from '../../../Store/InvoiceAction/invoice.actions';


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
  customerDtails: Customer | null = null;
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
    private _invoiceService: GenerateInvoiceNumberService
  ) { }



  ngOnInit(): void {
    this._pageTitle = this.activateroute$.snapshot.data['title'];
    this._label = this.activateroute$.snapshot.data['title'];
    this.generateInvoice();

    this.activateroute$.queryParams.subscribe(params => {
      this.customerId = params['invoiceId'];
      if (this.customerId) {
        this.loading$ = true
        this.getCustomerById(this.customerId);
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


  generateInvoice(): void {
    this.invoiceNumber$ = this._invoiceService.generateInvoiceNumber();
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
    this._btnLoading = true
    const invoiceData: InvoiceModel = {
      customerId: this.customerId ?? '',
      invoiceNumber: this.invoiceNumber$ ?? '',
      date: this._currentDate ?? '',
      finalAmount: this.finalAmount,
      InvoiceItems: this.invoiceItems
    };
    await this.store.dispatch(InvoiceActions.saveInvoice({ invoice: invoiceData }));
    this._btnLoading = false
  }

}
