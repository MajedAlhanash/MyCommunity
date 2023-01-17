import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiBaseUrl = environment.apiEndpoint

  constructor(public httpClient: HttpClient, private jwt: JwtHelperService) { }

  public getToken(): any {    
    return localStorage.getItem('token');
  }

    public setToken(token: any) {
    localStorage.setItem('token', token);
  }

  public isAuthenticated() {
    const token = this.getToken();
    return this.jwt.isTokenExpired(token);
  }

  login(loginForm: any): Observable<any> {
    console.log(loginForm);
    
    return this.httpClient.post<any>(this.apiBaseUrl + `/users/login`, loginForm)
  }
}
