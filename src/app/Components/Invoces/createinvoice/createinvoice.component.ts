import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TosterService } from '../../../helperService/Toster/toster.service';

@Component({
  selector: 'app-createinvoice',
  standalone: true,
  imports: [FormsModule,CommonModule],
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

  invoiceItems = [
    { description: '', quantity: 1, unitPrice: 0, total: 0 }
  ];
 discount = 0;
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
  }

  get invoiceTotal() {
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

  saveInvoice() {
    console.log('Invoice saved:', this.invoiceItems);
  }

}
