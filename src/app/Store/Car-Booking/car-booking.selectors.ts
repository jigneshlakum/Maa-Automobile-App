import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookingState } from './car-booking.reducer';

export const selectBookingState = createFeatureSelector<BookingState>('bookings');

export const selectAllBookings = createSelector(
  selectBookingState,
  (state: BookingState) => state.booking
);

export const selectBooking = createSelector(
  selectBookingState,
  (state: BookingState) => state.selectedData
);

export const selectLoading = createSelector(
  selectBookingState,
  (state: BookingState) => state.loading
);

export const selectBookingError = createSelector(
  selectBookingState,
  (state: BookingState) => state.error
);
