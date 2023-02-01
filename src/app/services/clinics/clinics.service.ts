import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getAllCLinics(): Observable<any> {
    let params = new HttpParams().set('MaxResult', 100)
    return this.httpClient.get(this.apiBaseUrl + 'clinics', { params: params });
  }

  getClinicDetailsById(id: number): Observable<any> {
    return this.httpClient.get(
      this.apiBaseUrl + `clinics/get-clinic-details-by-id?clinicId=${id}`
    );
  }

  createNewClinic(newCLinic: FormData): Observable<any> {
    return this.httpClient.post(
      this.apiBaseUrl + 'clinics',
      newCLinic
    );
  }

  editClinicInfo(newCLinic: FormData): Observable<any> {
    return this.httpClient.post(this.apiBaseUrl + 'clinics', newCLinic)
  }

  searchClinicByName(text: any): Observable<any> {
    return this.httpClient.get(this.apiBaseUrl + `clinics?Search=${text}`)
  }

  updateClinic(newClinic:any){
    return this.httpClient.put(this.apiBaseUrl + 'clinics', newClinic)
  }
  
  //---------------------Location------------------------------------------------
  getClinicLocation(id: number): Observable<any> {
    return this.httpClient.get<any>(
      this.apiBaseUrl + `clinics/get-clinic-locations?clinicId=${id}`
    );
  }

  createLocation(location: any): Observable<any> {
    return this.httpClient.post<any>(
      this.apiBaseUrl + 'clinics/locations/create-location',
      location
    );
  }

  updateLocation(location: CreateUpdateLocationModel): Observable<any> {
    return this.httpClient.post<CreateUpdateLocationModel>(
      this.apiBaseUrl + 'clinics/locations/update-location',
      location
    );
  }

  deleteLocation(id: any): Observable<any> {
    let locationParams = new HttpParams().set('locationId', id)
    console.log(locationParams.get('locationId'))
    return this.httpClient.post(this.apiBaseUrl + 'clinics/locations/delete-location', {}, { params: locationParams })
  }

  //---------------------Service------------------------------------------------
  getClinicServices(id: number): Observable<any> {
    return this.httpClient.get(
      this.apiBaseUrl + `clinics/get-clinic-services?clinicId=${id}`
    );
  }

  createService(service: FormData): Observable<any> {
    return this.httpClient.post<any>(this.apiBaseUrl + 'clinics/services/create-service', service);
  }

  updateService(service: CreateUpdateServiceModel): Observable<any> {
    return this.httpClient.post<CreateUpdateServiceModel>(
      this.apiBaseUrl + 'clinics/services/update-service',
      service
    );
  }

  deleteService(id: number): Observable<any> {
    let params112 = new HttpParams().set('serviceId', id);
    console.log(params112.get('serviceId'))
    return this.httpClient.post(this.apiBaseUrl + 'clinics/services/delete-service', {}, { params: params112 });
  }

  //------------------Insurance--------------------------------------------------
  getClinicInsurances(id: number): Observable<any> {
    return this.httpClient.get(
      this.apiBaseUrl + `clinics/get-clinic-insurances?clinicId=${id}`
    );
  }

  createInsurances(insurance: CreateUpdateInsuranceModel): Observable<any> {
    return this.httpClient.post<CreateUpdateInsuranceModel>(
      this.apiBaseUrl + 'clinics/insurances/create-insurance',
      insurance
    );
  }

  updateInsurance(insurance: CreateUpdateInsuranceModel): Observable<any> {
    return this.httpClient.post<CreateUpdateInsuranceModel>(
      this.apiBaseUrl + 'clinics/insurances/update-insurance',
      insurance
    );
  }

  deleteInsurance(id: number): Observable<any> {
    let params = new HttpParams().set('insuranceId', id);
    return this.httpClient.post(
      this.apiBaseUrl + 'clinics/insurances/delete-insurance', {}, { params }
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
      `clinics/before-and-after/get-clinic-before-and-after?clinicId=${clinicId}&pageId=${pageId}&pageCount=${pageCount}`
    );
  }

  createNewBeforeAndAfter(value: any): Observable<any> {
    return this.httpClient.post(this.apiBaseUrl + 'clinics/before-and-after/create-clinic-before-and-after', value)
  }

  deleteNewBeforeAndAfter(id: any): Observable<any> {
    console.log(id)
    return this.httpClient.delete(this.apiBaseUrl + `clinics/before-and-after/remove-clinic-before-and-after?beforAndAfterId=${id}`)
  }
  //-------------------Stories--------------------------------------------------------
  getClinicStroies(clinicId: number): Observable<any> {
    return this.httpClient.get(
      this.apiBaseUrl +
      `clinics/stories/get-clinic-stories?clinicId=${clinicId}`
    );
  }

  deleteStory(storyId: number): Observable<any> {
    let param = new HttpParams().set('storyId', storyId)
    return this.httpClient.post(
      this.apiBaseUrl + `clinics/stories/delete-story`, {}, { params: param }
    );
  }

  createStory(formData: FormData): Observable<any> {
    return this.httpClient.post(this.apiBaseUrl + 'clinics/stories/create-story', formData)
  }


  //-------------------Posts--------------------------------------------------------
  getClinicPosts(id:any): Observable<any> {
    return this.httpClient.get(
      this.apiBaseUrl +
      `clinics/get-clinic-posts?clinicId=${id}`
    );
  }

  createClinicPost(data: FormData): Observable<any> {
    return this.httpClient.post(this.apiBaseUrl + 'clinics/posts/create-post', data)
  }

  getClinicPostBySearch(searchText: string, pageId: number, pageCount: number): Observable<any> {
    return this.httpClient.get(
      this.apiBaseUrl +
      `clinics/posts/get-posts-by-name-search?searchText=${searchText}&pageId=${pageId}&pageCount=${pageCount}`
    );
  }

  getPostDetails(postId: number): Observable<any> {
    return this.httpClient.get(
      this.apiBaseUrl +
      `clinics/posts/get-post-details-by-id?postId=${postId}`
    );
  }

  updataClinicPost(data: any): Observable<any> {
    return this.httpClient.post(this.apiBaseUrl + 'clinics/posts/update-post', data)
  }

  deletePost(postId: number): Observable<any> {
    return this.httpClient.post(this.apiBaseUrl +
      `clinics/posts/delete-post?postId=${postId}`, postId
    );
  }

  searchPost(text: any): Observable<any> {
    return this.httpClient.get(this.apiBaseUrl + `clinics/posts/get-posts-by-name-search?searchText=${text}&pageId=1&pageCount=1000`)
  }


  /**************************Doctors*****************************/
  addNewDoctor(value: any): Observable<any> {
    return this.httpClient.post(this.apiBaseUrl + 'doctors/create-doctor', value)
  }
  updataDoctor(value: any): Observable<any> {
    return this.httpClient.post(this.apiBaseUrl + 'doctors/update-doctor', value)
  }
  deleteDoctor(id: any): Observable<any> {
    console.log(id)
    let param = new HttpParams().set('doctorId', id)
    return this.httpClient.post(this.apiBaseUrl + 'doctors/delete-doctor', {}, { params: param })
  }

  getDoctorDetails(id:any):Observable<any>{
    return this.httpClient.get(this.apiBaseUrl+`doctors/get-doctor-details?doctorId=${id}`)
  }

  /*********************************appointments************************************** */

  getClinicPendingAppointments(clinicId: any): Observable<any> {
    return this.httpClient.get(this.apiBaseUrl + `clinics/appointments/get-clinic-pending-appointments?clinicId=${clinicId}`)
  }
  getClinicConfirmedAppointments(clinicId: any): Observable<any> {
    return this.httpClient.get(this.apiBaseUrl + `clinics/appointments/get-clinic-confirmed-appointments?clinicId=${clinicId}`)
  }


}


