import { createAction, props } from '@ngrx/store';
import { CarBooking } from '../../Shared/Models/car-booking.model';

export const loadData = createAction('[Booking] Load Bookings');
export const loadDataSuccess = createAction('[Booking] Load Bookings Success', props<{ bookings: CarBooking[] }>());
export const loadDataFailure = createAction('[Booking] Load Bookings Failure', props<{ error: string }>());

export const saveData = createAction('[Booking] Save Booking', props<{ booking: CarBooking }>());
export const saveDataSuccess = createAction('[Booking] Save Booking Success', props<{ message: string }>());
export const saveDataFailure = createAction('[Booking] Save Booking Failure', props<{ error: string }>());

export const deleteData = createAction('[Booking] Delete Booking', props<{ id: string }>());
export const deleteDataSuccess = createAction('[Booking] Delete Booking Success', props<{ id: string, message: string }>());
export const deleteDataFailure = createAction('[Booking] Delete Booking Failure', props<{ error: string }>());

export const getById = createAction('[Booking] Get Booking By ID', props<{ id: string }>());
export const getByIdSuccess = createAction('[Booking] Get Booking By ID Success', props<{ booking: CarBooking }>());
export const getByIdFailure = createAction('[Booking] Get Booking By ID Failure', props<{ error: string }>());

export const updateData = createAction('[Booking] Update Booking', props<{ booking: CarBooking }>());
export const updateDataSuccess = createAction('[Booking] Update Booking Success', props<{ message: string }>());
export const updateDataFailure = createAction('[Booking] Update Booking Failure', props<{ error: string }>());
