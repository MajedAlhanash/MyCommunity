import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesResponse, CategoryModal, EditCategoryModal, NewCategoryModal } from 'src/app/model/categories/categories.modal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiBaseUrl = environment.apiEndpoint

  constructor(public httpClient: HttpClient) { }


  public getAllCategories(search:string=''): Observable<CategoriesResponse> {
    return this.httpClient.get<CategoriesResponse>(this.apiBaseUrl + '/categories/categories',{
      params:{
        Search: search
      }});
  }

  // public getCategoryByPage(): Observable<CategoriesResponse> {
  //   return this.httpClient.get<CategoriesResponse>(this.apiBaseUrl + '/categories/get-all');
  // }

  public addNewCategory(newCategory: NewCategoryModal) :Observable<any>{
    var formdata = this.createNewCategoryFormData(newCategory);
    //const requestHeaders = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.httpClient.post(this.apiBaseUrl + '/categories/create/', formdata);
  }

  public editNewCategory(editCategory: EditCategoryModal) :Observable<any>{
    var formdata = this.createEditCategoryFormData(editCategory);
    return this.httpClient.put(this.apiBaseUrl + '/categories/update', formdata);
  }

  public deleteCategory(category: any) :Observable<any>{
    let response =  this.httpClient.delete(this.apiBaseUrl + '/categories/' + category.id);
    return response;
  }
  public getCategory(id: number) :Observable<any>{
    return this.httpClient.get(this.apiBaseUrl + '/categories/' + id);
  }
  private createCategoryFormData(category:CategoryModal):FormData
  {
    var formdata = new FormData();
    /*if(category.icon)
      formdata.append('icon',category.icon);*/
    if(category.Name)
      formdata.append('Name',category.Name);
    return formdata;
    
  }
  private createNewCategoryFormData(category:NewCategoryModal)
  {
    var formdata = this.createCategoryFormData(category);
    /*if(category.clinics)
    {
      formdata.append('ClinicsIds', JSON.stringify(category.clinics));
    }*/
    return formdata;
  }
  private createEditCategoryFormData(category:EditCategoryModal)
  {
    var formdata = this.createCategoryFormData(category);
    formdata.append('Id',String(category.Id));
    return formdata;
  }
  public unassignCategoryClinic(categoryClinic: any) :Observable<any>{
    let response =  this.httpClient.put(this.apiBaseUrl + '/categories/unassign-clinic-from-category/' + categoryClinic.clinicId + '/', categoryClinic.categoryId);
    return response;
  }
}
