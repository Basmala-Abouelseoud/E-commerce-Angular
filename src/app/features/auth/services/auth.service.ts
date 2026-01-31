import { inject, Injectable } from '@angular/core';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { STORED_KEYS } from '../../../core/constants/storedKeys';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttp {
  private readonly router = inject(Router);

  login(userData: {}) {
    return this.http.post<IAuthResponse>(APP_APIS.AUTH.login, userData);
  }

  signup(userData: {}) {
    return this.http.post(APP_APIS.AUTH.signup, userData);
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  decodeToken(token: string): boolean | void {
    try {
      const userId = (jwtDecode(token) as { id: string })?.id;
      localStorage.setItem(STORED_KEYS.USER_ID, userId);
      return true;
    } catch {
      this.logOut();
    }
  }

 setEmailVerify(userData: {}):Observable<any>{
  return this.http.post(`${environment.baseUrl}auth/forgotPasswords`, userData)
 }


 setCodeVerify(userData: {}):Observable<any>{
  return this.http.post(`${environment.baseUrl}auth/verifyResetCode`, userData)
 }

 resetPass(userData: {}):Observable<any>{
  return this.http.put(`${environment.baseUrl}auth/resetPassword`, userData)
 }

}
