import { Component, OnInit } from '@angular/core';
import { DeleteDialogComponent } from '../../CommonComponent/Dialog/delete-dialog/delete-dialog.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Customer } from '../../../Shared/Models/Customer.model';
import { Store } from '@ngrx/store';
import { CustomerState } from '../../../Store/CustomerAction/customer.reducer';
import { CommonModule, DatePipe } from '@angular/common';
import * as BookingActions from '../../../Store/Car-Booking/car-booking.actions';
import { selectAllCustomers, selectLoading } from '../../../Store/CustomerAction/customer.selectors';
import { CarBooking } from '../../../Shared/Models/car-booking.model';
import { BookingState } from '../../../Store/Car-Booking/car-booking.reducer';
import { selectAllBookings } from '../../../Store/Car-Booking/car-booking.selectors';
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
  carBooking$: CarBooking[] = [];
  loading$: boolean = false;

  _isLoading: boolean = false;
  _showDeleteDialog: boolean = false; // open delete dialog
  _ids: string | null = null;
  _actionsVisibility: boolean[] = [];  // used Action button

  _searchTerm: string = ''; // ---------------- paginator
  _currentPage: number = 1; // ---------------- paginator
  _itemsPerPage: number = 5; // ---------------- paginator
  _displayedItems: CarBooking[] = []; // ---------------- paginator html component display valuse


  constructor(
    private _store: Store<BookingState>,
    private datePipe: DatePipe,
    private router$: Router,
    private activateroute$: ActivatedRoute
  ) {

    this._store.select(selectLoading).subscribe((item) => {
      this.loading$ = item;
    });

  }



  ngOnInit(): void {
    this._pageTitle = this.activateroute$.snapshot.data['title'];
    this._store.dispatch(BookingActions.loadData());
    this._store.select(selectAllBookings).subscribe((item) => {
      if (item && item.length > 0) {
        this.carBooking$ = item;
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
    const filteredList = this.carBooking$.filter(
      (data) =>
        data.customerId.customerName.toLowerCase().includes(this._searchTerm.toLowerCase())
    );

    const startIndex = (this._currentPage - 1) * this._itemsPerPage;
    const endIndex = Math.min(
      startIndex + this._itemsPerPage,
      filteredList.length
    );

    this._displayedItems = filteredList?.slice(startIndex, endIndex).map((item) => {
      return {
        ...item,
        start_date: this.datePipe.transform(item.start_date, 'MMMM d, y'),
        end_date: this.datePipe.transform(item.end_date, 'MMMM d, y')
      } as CarBooking;
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
    const maxPage = Math.ceil(this.carBooking$.length / this._itemsPerPage);
    if (this._currentPage < maxPage) {
      this._currentPage++;
      this.updateDisplayedData();
    }
  }

  // ---------------- paginator end

  toggleDeleteDialog(item: any) {
    this._ids = item._id;
    this._showDeleteDialog = !this._showDeleteDialog;
    this._actionsVisibility = new Array(this.carBooking$.length).fill(
      false
    );
  }


  delete(): void {
    if (this._ids !== null) {
      this._store.dispatch(BookingActions.deleteData({ id: this._ids }));
      this.toggleDeleteDialog(0);
    }
  }


  // Route
  navigateToRoute(item: any) {
    this.router$.navigate(['/booking/edit'], { queryParams: { id: item._id } });
  }


}

