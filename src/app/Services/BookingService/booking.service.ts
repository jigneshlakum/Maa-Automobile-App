import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { CarBooking } from '../../Shared/Models/car-booking.model';

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  private APIBaseUrl = environment.apiUrl;


  constructor(private http: HttpClient,
    private $authenticationService: AuthenticationService,
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.$authenticationService.getAuthToken(); // Retrieve the token from the service
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? token : ''
    });
  }



  getAll(selectedDate: string | null): Observable<{ status: boolean, data: CarBooking[], message: string }> {
    const headers = this.getHeaders();
    return this.http.post<{ status: boolean, data: CarBooking[], message: string }>(`${this.APIBaseUrl}getbooking`, {selectedDate}, { headers });
  }

  saveData(items: CarBooking): Observable<{ status: boolean, message: string }> {
    const headers = this.getHeaders();
    return this.http.post<{ status: boolean, message: string }>(`${this.APIBaseUrl}booking`, items, { headers });
  }

  deleteData(_id: any): Observable<{ status: boolean, message: string }> {
    const headers = this.getHeaders();
    return this.http.delete<{ status: boolean, message: string }>(`${this.APIBaseUrl}booking/${_id}`, { headers });
  }

  getById(id: any): Observable<CarBooking> {
    const headers = this.getHeaders();
    return this.http.get<CarBooking>(`${this.APIBaseUrl}booking/${id}`, { headers });
  }

  updateData(customer: CarBooking): Observable<{ status: boolean, message: string }> {
    const headers = this.getHeaders();
    return this.http.post<{ status: boolean, message: string }>(`${this.APIBaseUrl}bookingUpdate`, customer, { headers });
  }
}
