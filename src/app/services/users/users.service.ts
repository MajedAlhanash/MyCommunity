import { HttpClient, HttpParams } from '@angular/common/http';
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

  getAllUsers(): Observable<any> {
    let params = new HttpParams().set('Type', 3).set('MaxResult',100)
    return this.httpClient.get(this.apiBaseUrl + 'users/users', { params: params });
  }

  getAllSuperAdmins():Observable<any>{
    let params = new HttpParams().set('Type', 1).set('MaxResult',100)
    return this.httpClient.get(this.apiBaseUrl + 'users/users', { params: params })
  }
  
  getAdmins(): Observable<any> {
    return this.httpClient.get(this.apiBaseUrl + 'users/admins');
  }

  createUser(userInfo: FormData) {
    return this.httpClient.post(this.apiBaseUrl + 'users/create-user', userInfo);
  }

  searchUserByName(name:any){
    let params = new HttpParams().set('Name',name).set('Type',3)
    return this.httpClient.get(this.apiBaseUrl + 'users/users', {params})
  }

  searchAdminByName(name:any){
    let params = new HttpParams().set('Name',name).set('Type',1)
    return this.httpClient.get(this.apiBaseUrl + 'users/users', {params})
  }

  createCLinicAdmin(newCLinicAdmin: CreateCLinicAdmin): Observable<CreateCLinicAdmin> {
    return this.httpClient.post<CreateCLinicAdmin>(this.apiBaseUrl + 'users/create-clinic-admin', newCLinicAdmin);
  }

  updateUser(updateUser: any): Observable<any> {
    return this.httpClient.post<any>(this.apiBaseUrl + 'users/update-user', updateUser);
  }

  deleteUser(id: any): Observable<any> {
    let paramId = new HttpParams().set('userId', id)
    console.log(id)
    return this.httpClient.delete(this.apiBaseUrl + 'users/delete-user', { params: paramId });
  }

  resetPassword(userId: any, newPassword: any) {
    let modal = {
      userId: userId,
      password: newPassword
    }
    let params1 = new HttpParams().set('userId', userId).set('password', newPassword)
    console.log(modal)
    return this.httpClient.put(this.apiBaseUrl + 'users/reset-password', {}, { params: params1 })
  }
}
