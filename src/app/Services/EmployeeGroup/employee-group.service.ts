import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { EmployeeGroupModel } from '../../Shared/Models/Employee-group';
import { environment } from '../../../environments/environment';
import { CryptoService } from '../../helperService/CryptoService/crypto.service';
import { ResponseModel } from '../../Shared/Models/ResponseModel';
import { AuthenticationService } from '../authentication.service';


interface apiResponsh  {
  status: boolean
  message: string,
  data: EmployeeGroupModel
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeGroupService {
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


  getAll(): Observable<EmployeeGroupModel[]> {
    const headers = this.getHeaders();
    return this.http.post<ResponseModel>( `${this.APIBaseUrl}UserGroupMaster/GetAllUserGroupMaster`, null,{ headers }).pipe(
      map(response => {
        const encryptedData = response.data;
        const decryptedData = this.$decryptDataService.decryptData(encryptedData);
        return decryptedData;
      })
    );
  }

  // add new
  create(employeeGroup: EmployeeGroupModel): Observable<apiResponsh> {
    const headers = this.getHeaders();
    const payload = this.encryptPayload(employeeGroup);
    return this.http.post<apiResponsh>(`${this.APIBaseUrl}UserGroupMaster/AddorUpdateUserGroupMaster`, { payload }, { headers });
  }

  // deleete
  delete(id: number): Observable<apiResponsh> {
    const headers = this.getHeaders();
    const payload = this.encryptPayload({ UserGroupID: id });
    return this.http.post<apiResponsh>(`${this.APIBaseUrl}UserGroupMaster/DeleteUserGroup`, { payload },{headers});
  }

  // edit
  getEmployeeGroupById(id: number): Observable<EmployeeGroupModel | null> {
    const headers = this.getHeaders();
    const payload = this.encryptPayload({ UserGroupID: id });
    return this.http.post<any>(`${this.APIBaseUrl}UserGroupMaster/GetUserGroupMaster`, { payload }, { headers })
      .pipe(map((response) => {
          if (response.status && response.data) {
            const decryptedData = this.decryptPayload(response.data);
            return decryptedData as EmployeeGroupModel;
          } else {
            return null; // Handle error cases or empty responses
          }
        })
      );
  }

}
