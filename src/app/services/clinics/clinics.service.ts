import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUpdateInsuranceModel } from 'src/app/model/clinics/insurance.model';
import { CreateUpdateLocationModel } from 'src/app/model/clinics/locations.model';
import { CreateUpdateServiceModel } from 'src/app/model/clinics/service.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClinicsService {
  apiBaseUrl = environment.apiEndpoint;

  constructor(public httpClient: HttpClient) { }

  getAllCLinics(pageId: number, pageCount: number): Observable<any> {
    return this.httpClient.get(
      this.apiBaseUrl +
      `/clinics/get-clinics-by-pagination?pageId=${pageId}&pageCount=${pageCount}`
    );
  }

  getClinicDetailsById(id: number): Observable<any> {
    return this.httpClient.get(
      this.apiBaseUrl + `/clinics/get-clinic-details-by-id?clinicId=${id}`
    );
  }

  createNewClinic(newCLinic: any): Observable<any> {
    return this.httpClient.post(
      this.apiBaseUrl + '/users/create-clinic-admin ',
      newCLinic
    );
  }

  //---------------------Location------------------------------------------------
  getClinicLocation(id: number): Observable<any> {
    return this.httpClient.get<any>(
      this.apiBaseUrl + `/clinics/get-clinic-locations?clinicId=${id}`
    );
  }

  createLocation(location: CreateUpdateLocationModel): Observable<any> {
    return this.httpClient.post<CreateUpdateLocationModel>(
      this.apiBaseUrl + '/clinics/locations/create-location',
      location
    );
  }

  updateLocation(location: CreateUpdateLocationModel): Observable<any> {
    return this.httpClient.post<CreateUpdateLocationModel>(
      this.apiBaseUrl + '/clinics/locations/update-location',
      location
    );
  }

  deleteLocation(id: number): Observable<any> {
    return this.httpClient.delete(
      this.apiBaseUrl + `/clinics/locations/delete-location?locationId=${id}`
    );
  }

  //---------------------Service------------------------------------------------
  getClinicServices(id: number): Observable<any> {
    return this.httpClient.get(
      this.apiBaseUrl + `/clinics/get-clinic-services?clinicId=${id}`
    );
  }

  createService(service: any): Observable<any> {
    return this.httpClient.post<any>(
      this.apiBaseUrl + '/clinics/services/create-service',
      service
    );
  }

  updateService(service: CreateUpdateServiceModel): Observable<any> {
    return this.httpClient.post<CreateUpdateServiceModel>(
      this.apiBaseUrl + '/clinics/services/update-service',
      service
    );
  }

  deleteService(id: number): Observable<any> {
    return this.httpClient.delete(
      this.apiBaseUrl + `/clinics/services/delete-service?serviceId=${id}`
    );
  }

  //------------------Insurance--------------------------------------------------
  getClinicInsurances(id: number): Observable<any> {
    return this.httpClient.get(
      this.apiBaseUrl + `/clinics/get-clinic-insurances?clinicId=${id}`
    );
  }

  createInsurances(insurance: CreateUpdateInsuranceModel): Observable<any> {
    return this.httpClient.post<CreateUpdateInsuranceModel>(
      this.apiBaseUrl + '/clinics/insurances/create-insurance',
      insurance
    );
  }

  updateInsurance(insurance: CreateUpdateInsuranceModel): Observable<any> {
    return this.httpClient.post<CreateUpdateInsuranceModel>(
      this.apiBaseUrl + '/clinics/insurances/update-insurance',
      insurance
    );
  }

  deleteInsurance(id: number): Observable<any> {
    return this.httpClient.delete(
      this.apiBaseUrl + `/clinics/insurances/delete-insurance?insuranceId=${id}`
    );
  }

  //------------------Befor and after--------------------------------------------------
  getBeforAndAfter(
    clinicId: number,
    pageId: number,
    pageCount: number
  ): Observable<any> {
    return this.httpClient.get(
      this.apiBaseUrl +
      `/clinics/before-and-after/get-clinic-before-and-after?clinicId=${clinicId}&pageId=${pageId}&pageCount=${pageCount}`
    );
  }

  //-------------------Stories--------------------------------------------------------
  getClinicStroies(clinicId: number): Observable<any> {
    return this.httpClient.get(
      this.apiBaseUrl +
      `/clinics/stories/get-clinic-stories?clinicId=${clinicId}`
    );
  }

  deleteStory(storyId: number): Observable<any> {
    return this.httpClient.delete(
      this.apiBaseUrl + `/clinics/stories/delete-story?storyId=${storyId}`
    );
  }

  //-------------------Posts--------------------------------------------------------
  getClinicPosts(pageId: number ,pageCount:number): Observable<any> {
    return this.httpClient.get(
      this.apiBaseUrl +
      `/clinics/posts/get-posts-by-pagination?pageId=${pageId}&pageCount=${pageCount}`
    );
  }

  getClinicPostBySearch(searchText:string, pageId: number ,pageCount:number): Observable<any> {
    return this.httpClient.get(
      this.apiBaseUrl +
      `/clinics/posts/get-posts-by-name-search?searchText=${searchText}&pageId=${pageId}&pageCount=${pageCount}`
    );
  }

  getPostDetails(postId: number): Observable<any> {
    return this.httpClient.get(
      this.apiBaseUrl +
      `/clinics/posts/get-post-details-by-id?postId=${postId}`
    );
  }

  deletePost(postId: number): Observable<any> {
    return this.httpClient.post(
      this.apiBaseUrl +
      `/clinics/posts/delete-post?postId=${postId}` , postId
    );
  }
}
