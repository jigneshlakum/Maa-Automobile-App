import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CryptoService } from '../../helperService/CryptoService/crypto.service';
import { AuthenticationService } from '../authentication.service';
import { MenuItem } from '../../Shared/Models/Menu-item.model';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private APIBaseUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private $decryptDataService: CryptoService, // Inject the encryption service
    private $authenticationService: AuthenticationService,
  ) { }


  private getHeaders(): HttpHeaders {
    const token = this.$authenticationService.getAuthToken(); // Retrieve the token from the service
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? token : ''
    });
  }

  encryptPayload(payload: any): string {
    return this.$decryptDataService.encryptData(payload)
  }

  decryptPayload(encryptedPayload: string): any {
    const decryptedString = this.$decryptDataService.decryptData(encryptedPayload);
    return decryptedString;
  }

  getMenuItemById(id: number): Observable<MenuItem> {
    const headers = this.getHeaders();
    const payload = this.encryptPayload({ UserGroupID: id });
    return this.http.post<any>(`${this.APIBaseUrl}UserAccess/GetAllModule`, { payload }, { headers })
      .pipe(
        map(response => {
          if (response.status && response.data) {
            const decryptedData = this.decryptPayload(response.data);
            return decryptedData as MenuItem;
          } else {
            throw new Error('Failed to load menu item'); // Handle error cases or empty responses
          }
        }),
        catchError(error => {
          console.error('Error loading menu item', error);
          return throwError(error);
        })
      );
  }


  updateMenuItem(menuItem: Partial<MenuItem>): Observable<any> {
    const headers = this.getHeaders();
    const payload = this.encryptPayload(menuItem);
    return this.http.post<any>(`${this.APIBaseUrl}UserAccess/SetUserAccess`, { payload }, { headers })
      .pipe(
        map(response => {
          if (response.status && response.data) {
            const decryptedData = this.decryptPayload(response.data);
            return decryptedData as MenuItem;
          } else {
            throw new Error('Failed to load menu item'); // Handle error cases or empty responses
          }
        }),
        catchError(error => {
          console.error('Error loading menu item', error);
          return throwError(error);
        })
      );
  }

}
