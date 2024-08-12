import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InvoiceModel } from '../../../Shared/Models/Invoice.model';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { InvoiceState } from '../../../Store/InvoiceAction/invoice.reducer';
import { selectInvoices, selectLoading } from '../../../Store/InvoiceAction/invoice.selectors';
import * as InvoiceActions from '../../../Store/InvoiceAction/invoice.actions';
import { DeleteDialogComponent } from '../../CommonComponent/Dialog/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-listing-invoices',
  standalone: true,
  imports: [RouterLink, DeleteDialogComponent, CommonModule],
  templateUrl: './listing-invoices.component.html',
  styleUrl: './listing-invoices.component.css',
  providers: [DatePipe]
})
export class ListingInvoicesComponent implements OnInit {

  invoiceItems$: InvoiceModel[] = [];
  loading$: boolean = false;

  _isLoading: boolean = false;
  _showDeleteDialog: boolean = false; // open delete dialog
  _ids: number | null = null;
  _actionsVisibility: boolean[] = [];  // used Action button

  _searchTerm: string = ''; // ---------------- paginator
  _currentPage: number = 1; // ---------------- paginator
  _itemsPerPage: number = 5; // ---------------- paginator
  _displayedItems: InvoiceModel[] = []; // ---------------- paginator html component display valuse



  constructor(
    private _store: Store<InvoiceState>,
    private datePipe: DatePipe,
    private router$ : Router
  ) {

    this._store.select(selectLoading).subscribe((item) => {
      this.loading$ = item;
    });

  }

  ngOnInit(): void {
    this._store.dispatch(InvoiceActions.loadInvoices());
    this._store.select(selectInvoices).subscribe((item) => {
      if (item && item.length > 0) {
        this.invoiceItems$ = item;
        this.updateDisplayedData(); // ---------------- paginator
      }
    });

  }

  // Action
  toggleActionsVisibility(index: number): void {
    this._actionsVisibility[index] = !this._actionsVisibility[index];
  }

  // ---------------- paginator start
  updateDisplayedData(): void {
    const filteredList = this.invoiceItems$.filter(
      (data) =>
        data.invoiceNumber.toLowerCase().includes(this._searchTerm.toLowerCase())
    );

    const startIndex = (this._currentPage - 1) * this._itemsPerPage;
    const endIndex = Math.min(
      startIndex + this._itemsPerPage,
      filteredList.length
    );

    this._displayedItems = filteredList.slice(startIndex, endIndex).map((item) => {
      return {
        ...item,
        createdAt: this.datePipe.transform(item.date, 'MMMM d, y')
      };
    });
    
  }

  onSearch(event: any): void {
    this._searchTerm = event.target.value;
    this._currentPage = 1;
    this.updateDisplayedData();
  }

  previousPage(): void {
    if (this._currentPage > 1) {
      this._currentPage--;
      this.updateDisplayedData();
    }
  }

  nextPage(): void {
    const maxPage = Math.ceil(this.invoiceItems$.length / this._itemsPerPage);
    if (this._currentPage < maxPage) {
      this._currentPage++;
      this.updateDisplayedData();
    }
  }

  // ---------------- paginator end

  toggleDeleteDialog(item: any) {
    this._ids = item._id;
    this._showDeleteDialog = !this._showDeleteDialog;
    this._actionsVisibility = new Array(this.invoiceItems$.length).fill(
      false
    );
  }


  delete(): void {
    if (this._ids !== null) {
      this._store.dispatch(InvoiceActions.deleteInvoice({ id: this._ids }));
      this.toggleDeleteDialog(0);
    }
  }


// Route

navigateToRoute(item: any) {
  this.router$.navigate(['/invoice/edit'], { queryParams: { id: item._id } });
}


}
