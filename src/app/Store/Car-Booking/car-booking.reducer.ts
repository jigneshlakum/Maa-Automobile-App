import { createReducer, on } from '@ngrx/store';
import * as BookingActions from './car-booking.actions';
import { CarBooking } from '../../Shared/Models/car-booking.model';

export interface BookingState {
  booking: CarBooking[];
  selectedData: CarBooking | null;
  loading: boolean;
  error: string | null;
}

export const initialState: BookingState = {
  booking: [],
  selectedData: null,
  loading: false,
  error: null
};

export const bookingReducer = createReducer(
  initialState,
  on(BookingActions.loadData, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(BookingActions.loadDataSuccess, (state, { bookings }) => ({
    ...state,
    booking: bookings,
    loading: false,
    error: null
  })),
  on(BookingActions.loadDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(BookingActions.saveData, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(BookingActions.saveDataSuccess, state => ({
    ...state,
    loading: false,
    error: null
  })),
  on(BookingActions.saveDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(BookingActions.deleteData, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(BookingActions.deleteDataSuccess, (state, { id }) => ({
    ...state,
    booking: state.booking.filter(item => item.id !== id),
    loading: false,
    error: null
  })),
  on(BookingActions.deleteDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(BookingActions.getById, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(BookingActions.getByIdSuccess, (state, { booking }) => ({
    ...state,
    selectedData: booking,
    loading: false,
    error: null
  })),
  on(BookingActions.getByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(BookingActions.updateData, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(BookingActions.updateDataSuccess, state => ({
    ...state,
    loading: false,
    error: null
  })),
  on(BookingActions.updateDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
