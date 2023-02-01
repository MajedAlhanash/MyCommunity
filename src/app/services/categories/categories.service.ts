import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesResponse, NewCategoryModal } from 'src/app/model/categories/categories.modal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiBaseUrl = environment.apiEndpoint

  constructor(public httpClient: HttpClient) { }


  public getAllCategories(search:string=''): Observable<CategoriesResponse> {
    return this.httpClient.get<CategoriesResponse>(this.apiBaseUrl + 'categories/categories',{
      params:{
        Search: search
      }});
  }

  // public getCategoryByPage(): Observable<CategoriesResponse> {
  //   return this.httpClient.get<CategoriesResponse>(this.apiBaseUrl + '/categories/get-all');
  // }

  public addNewCategory(newCategory: NewCategoryModal) :Observable<any>{
    return this.httpClient.post(this.apiBaseUrl + 'categories/create', newCategory);
  }
}
