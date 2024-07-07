import { Component, OnInit } from '@angular/core';
import { DeleteDialogComponent } from '../../CommonComponent/Dialog/delete-dialog/delete-dialog.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Customer } from '../../../Shared/Models/Customer.model';
import { Store } from '@ngrx/store';
import { CustomerState } from '../../../Store/CustomerAction/customer.reducer';
import { CommonModule, DatePipe } from '@angular/common';
import * as CustomerActions from '../../../Store/CustomerAction/customer.actions';
import { selectAllCustomers, selectLoading } from '../../../Store/CustomerAction/customer.selectors';
declare var $: any; // Declare jQuery


@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [RouterLink, DeleteDialogComponent, CommonModule],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css',
  providers: [DatePipe]
})
export class ListingComponent implements OnInit {
  _pageTitle: string = '';
  customers$: Customer[] = [];
  loading$: boolean = false;

  _isLoading: boolean = false;
  _showDeleteDialog: boolean = false; // open delete dialog
  _ids: number | null = null;
  _actionsVisibility: boolean[] = [];  // used Action button

  _searchTerm: string = ''; // ---------------- paginator
  _currentPage: number = 1; // ---------------- paginator
  _itemsPerPage: number = 5; // ---------------- paginator
  _displayedItems: Customer[] = []; // ---------------- paginator html component display valuse


  constructor(
    private _store: Store<CustomerState>,
    private datePipe: DatePipe,
    private router$: Router,
    private activateroute$: ActivatedRoute
  ) {

    this._store.select(selectLoading).subscribe((item) => {
      this.loading$ = item;
    });

  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('select').niceSelect();
    });
  }

  ngOnInit(): void {
    this._pageTitle = this.activateroute$.snapshot.data['title'];
    this._store.dispatch(CustomerActions.loadCustomers());
    this._store.select(selectAllCustomers).subscribe((item) => {
      if (item && item.length > 0) {
        this.customers$ = item;
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
    const filteredList = this.customers$.filter(
      (data) =>
        data.customerName.toLowerCase().includes(this._searchTerm.toLowerCase()) ||
        data.vehicleNumber.toLowerCase().includes(this._searchTerm.toLowerCase())
    );

    const startIndex = (this._currentPage - 1) * this._itemsPerPage;
    const endIndex = Math.min(
      startIndex + this._itemsPerPage,
      filteredList.length
    );

    this._displayedItems = filteredList.slice(startIndex, endIndex).map((item) => {
      return {
        ...item,
        createdAt: this.datePipe.transform(item.createdAt, 'EEEE, MMMM d, y')
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
    const maxPage = Math.ceil(this.customers$.length / this._itemsPerPage);
    if (this._currentPage < maxPage) {
      this._currentPage++;
      this.updateDisplayedData();
    }
  }

  // ---------------- paginator end

  toggleDeleteDialog(item: any) {
    this._ids = item._id;
    this._showDeleteDialog = !this._showDeleteDialog;
    this._actionsVisibility = new Array(this.customers$.length).fill(
      false
    );
  }


  delete(): void {
    if (this._ids !== null) {
      this._store.dispatch(CustomerActions.deleteCustomer({ id: this._ids }));
      this.toggleDeleteDialog(0);
    }
  }


  // Route
  navigateToRoute(item: any) {
    this.router$.navigate(['/customers/edit'], { queryParams: { id: item._id } });
  }


}

