import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../Shared/Models/Customer.model';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
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

  getCustomers(): Observable<{ status: boolean, data: Customer[], message: string }> {
    const headers = this.getHeaders();
    return this.http.get<{ status: boolean, data: Customer[], message: string }>(`${this.APIBaseUrl}customers`, { headers });
  }

  saveCustomer(customer: Customer): Observable<{ status: boolean, message: string }> {
    const headers = this.getHeaders();
    return this.http.post<{ status: boolean, message: string }>(`${this.APIBaseUrl}customers`, customer, { headers });
  }

  deleteCustomer(_id: any): Observable<{ status: boolean, message: string }> {
    const headers = this.getHeaders();
    return this.http.delete<{ status: boolean, message: string }>(`${this.APIBaseUrl}customers/${_id}`, { headers });
  }

  getCustomerById(id: any): Observable<Customer> {
    const headers = this.getHeaders();
    return this.http.get<Customer>(`${this.APIBaseUrl}customers/${id}`, { headers });
  }

  updateCustomer(customer: Customer): Observable<{ status: boolean, message: string }> {
    const headers = this.getHeaders();
    return this.http.put<{ status: boolean, message: string }>(`${this.APIBaseUrl}customers`, customer, { headers });
  }

}
