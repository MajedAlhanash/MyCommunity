import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCLinicAdmin, UpdateUser } from 'src/app/model/users/users.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiBaseUrl = environment.apiEndpoint

  constructor(public httpClient: HttpClient) { }

  getAllUsers() : Observable<any>{
    return this.httpClient.get(this.apiBaseUrl + '')
  }

  createCLinicAdmin(newCLinicAdmin: CreateCLinicAdmin): Observable<CreateCLinicAdmin>{
    return this.httpClient.post<CreateCLinicAdmin>(this.apiBaseUrl + '/users/create-clinic-admin', newCLinicAdmin)
  }

  updateUser(updateUser: UpdateUser): Observable<UpdateUser>{
    return this.httpClient.post<UpdateUser>(this.apiBaseUrl + '/users/update-user', updateUser)
  }

  deleteUser(id: number): Observable<any>{
    return this.httpClient.delete(this.apiBaseUrl + '')
  }
}
