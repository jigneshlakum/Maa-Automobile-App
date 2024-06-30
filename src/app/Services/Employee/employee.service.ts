import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CryptoService } from '../../helperService/CryptoService/crypto.service';
import { AuthenticationService } from '../authentication.service';
import { Observable, map } from 'rxjs';
import { EmployeeModel } from '../../Shared/Models/Employee';
import { ResponseModel } from '../../Shared/Models/ResponseModel';

interface ApiResponsh  {
  status: boolean
  message: string,
  data: EmployeeModel
}


@Injectable({
  providedIn: 'root'
})


export class EmployeeService {
  private APIBaseUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private $decryptDataService: CryptoService, // Inject the encryption service
    private $authenticationService : AuthenticationService,
  ) {}

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

  getAll(): Observable<EmployeeModel[]> {
    const headers = this.getHeaders();
    return this.http.post<ResponseModel>( `${this.APIBaseUrl}UserMaster/GetAllUserMaster`, null,{ headers }).pipe(
      map(response => {
        const encryptedData = response.data;
        const decryptedData = this.$decryptDataService.decryptData(encryptedData);
        return decryptedData;
      })
    );
  }


}
