import { Component, OnInit } from '@angular/core';
import { DeleteDialogComponent } from '../../CommonComponent/Dialog/delete-dialog/delete-dialog.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule, DatePipe } from '@angular/common';
import * as BookingActions from '../../../Store/Car-Booking/car-booking.actions';
import { selectAllBookings, selectLoading } from '../../../Store/Car-Booking/car-booking.selectors';
import { CarBooking } from '../../../Shared/Models/car-booking.model';
import { BookingState } from '../../../Store/Car-Booking/car-booking.reducer';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [RouterLink, DeleteDialogComponent, CommonModule],
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
  providers: [DatePipe]
})
export class ListingComponent implements OnInit {
  _pageTitle: string = '';
  carBooking$: CarBooking[] = [];
  loading$: boolean = false;

  _isLoading: boolean = false;
  _showDeleteDialog: boolean = false;
  _ids: string | null = null;
  _actionsVisibility: boolean[] = [];

  _currentPage: number = 1;
  _itemsPerPage: number = 5;
  _displayedItems: CarBooking[] = [];
  selectedDate: string | null = null;


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
    const payload = { selectedDate: this.selectedDate }
    this._pageTitle = this.activateroute$.snapshot.data['title'];
    this._store.dispatch(BookingActions.loadData(payload));
    this._store.select(selectAllBookings).subscribe((item) => {
      // if (item && item.length > 0) {
      console.log(item);
      this.carBooking$ = item;
      this.updateDisplayedData();
      // }
    });
  }

  toggleActionsVisibility(index: number): void {
    this._actionsVisibility[index] = !this._actionsVisibility[index];
  }

  updateDisplayedData(): void {
    const startIndex = (this._currentPage - 1) * this._itemsPerPage;
    const endIndex = Math.min(startIndex + this._itemsPerPage, this.carBooking$.length);
    this._displayedItems = this.carBooking$.slice(startIndex, endIndex).map((item) => {
      return {
        ...item,
        start_date: this.datePipe.transform(item.start_date, 'd-MMMM-y'),
        end_date: this.datePipe.transform(item.end_date, 'd-MMMM-y')
      } as CarBooking;
    });
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

  toggleDeleteDialog(item: any): void {
    this._ids = item._id;
    this._showDeleteDialog = !this._showDeleteDialog;
    this._actionsVisibility = new Array(this.carBooking$.length).fill(false);
  }

  delete(): void {
    if (this._ids !== null) {
      this._store.dispatch(BookingActions.deleteData({ id: this._ids }));
      this.toggleDeleteDialog(0);
    }
  }

  onDateSelect(event: any): void {
    const payload = { selectedDate: this.datePipe.transform(event.target.value, 'dd-MM-yyyy') }
    this.updateDisplayedData();
    this._store.dispatch(BookingActions.loadData(payload));
  }

  clearDate(): void {
    const payload = { selectedDate: null }
    this._store.dispatch(BookingActions.loadData(payload));
  }

  navigateToRoute(item: any): void {
    this.router$.navigate(['/booking/edit'], { queryParams: { id: item._id } });
  }
}
