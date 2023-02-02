import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiBaseUrl = environment.apiEndpoint
  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<any> {
    return this.http.get(this.apiBaseUrl + 'roles');
  }

  getAllPermissions():Observable<any>{
    return this.http.get(this.apiBaseUrl+'roles/permissions')
  }
  
  getRolePermissions(id:any):Observable<any>{
    return this.http.get(this.apiBaseUrl+`roles/${id}`)
  }

  deleteRole(id:any):Observable<any>{
    let param=new HttpParams().set('id',id)
    return this.http.delete(this.apiBaseUrl+'roles',{params:param})
  }
  addNewRole(modal:any):Observable<any>{
    return this.http.post(this.apiBaseUrl+'roles',modal)
  }
  assignPermissionsToRole(modal:any):Observable<any>{
    return this.http.put(this.apiBaseUrl+'roles/assign-permissions-to-role',modal)
  }

  searchRoleByName(name:any):Observable<any>{
    let params = new HttpParams().set('Name',name).set('MaxResult',1000)
    return this.http.get(this.apiBaseUrl + 'roles', {params})
  }
}
