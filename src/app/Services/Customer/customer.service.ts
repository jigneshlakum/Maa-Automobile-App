import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../Shared/Models/Customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private APIBaseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getCustomers(): Observable<{ status: boolean, data: Customer[], message: string }> {
    return this.http.get<{ status: boolean, data: Customer[], message: string }>(`${this.APIBaseUrl}/customers`);
  }

}
