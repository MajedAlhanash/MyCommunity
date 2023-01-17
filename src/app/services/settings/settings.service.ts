import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  apiBaseUrl = environment.apiEndpoint;

  constructor(public httpClient: HttpClient) { }

  getSocailAccount() : Observable<any> {
    return this.httpClient.get<any>(this.apiBaseUrl + `/settings/app/api/settings/app-social-accounts/get-accounts`)
  }

  addNewSocialAccount(socialAccount: any): Observable<any> {
    return this.httpClient.post<any>(this.apiBaseUrl + `/settings/app/api/settings/app-social-account/add-account` , socialAccount)
  }

  updateSocialAccount(socialAccount: any): Observable<any> {
    return this.httpClient.post<any>(this.apiBaseUrl + `/settings/app/api/settings/app-social-account/update-account` , socialAccount)
  }

  deleteSocialAccount(socialAccount: any): Observable<any> {
    return this.httpClient.delete<any>(this.apiBaseUrl + `/settings/app/api/settings/app-social-account/delete-account` , socialAccount)
  }


}
