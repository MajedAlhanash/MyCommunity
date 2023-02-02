import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  apiBaseUrl = environment.apiEndpoint;

  constructor(public httpClient: HttpClient) { }

  getAllNotifications(): Observable<any> {
    return this.httpClient.get(this.apiBaseUrl + 'notifications');
  }

  createNotification(modal: any): Observable<any> {
    console.log(modal)
    return this.httpClient.post(this.apiBaseUrl + 'notifications', modal);
  }

  searchNotificationByName(text:any):Observable<any>{
    let params = new HttpParams().set('Search',text)
    return this.httpClient.get(this.apiBaseUrl+'notifications',{params})
  }

  getCustomUsers(id:any):Observable<any> {
    return this.httpClient.get(this.apiBaseUrl+`notifications/not-succeeded-users/${id}`)
  }
}
