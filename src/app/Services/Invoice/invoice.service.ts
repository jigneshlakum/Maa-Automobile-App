import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { InvoiceModel } from '../../Shared/Models/Invoice.model';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
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

  getInvoices(): Observable<{ status: boolean, data: InvoiceModel[], message: string }> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.APIBaseUrl}invoices`, { headers });
  }

  saveInvoice(customer: any): Observable<{ status: boolean, message: string }> {
    const headers = this.getHeaders();
    return this.http.post<{ status: boolean, message: string }>(`${this.APIBaseUrl}invoices`, customer, { headers });
  }

  deleteInvoice(_id: any): Observable<{ status: boolean, message: string }> {
    const headers = this.getHeaders();
    return this.http.delete<{ status: boolean, message: string }>(`${this.APIBaseUrl}invoices/${_id}`, { headers });
  }

  getInvoiceById(id: any): Observable<InvoiceModel> {
    const headers = this.getHeaders();
    return this.http.get<InvoiceModel>(`${this.APIBaseUrl}invoices/${id}`, { headers });
  }

  updateInvoice(customer: any): Observable<{ status: boolean, message: string }> {
    const headers = this.getHeaders();
    return this.http.put<{ status: boolean, message: string }>(`${this.APIBaseUrl}invoices`, customer, { headers });
  }

}
