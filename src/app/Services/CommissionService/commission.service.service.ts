import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommissionModel } from '../../Shared/Models/Commission.model';


@Injectable({
  providedIn: 'root'
})
export class CommissionServiceService {
  baseurl = 'https://dummyjson.com/users';
  constructor(private http: HttpClient) {
  }

  GetAll() {
    return this.http.get<CommissionModel[]>(this.baseurl);
  }

  Delete(id: number) {
    return this.http.delete(this.baseurl + '/' + id);
  }


}
