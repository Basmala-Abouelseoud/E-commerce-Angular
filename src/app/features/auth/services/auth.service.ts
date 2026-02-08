import { inject, Injectable } from '@angular/core';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { STORED_KEYS } from '../../../core/constants/storedKeys';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttp {
  private readonly router = inject(Router);

  isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

isLoggedIn(): boolean {
  return this.isLoggedIn$.getValue();
}


  login(userData: {}) {
    return this.http.post<IAuthResponse>(APP_APIS.AUTH.login, userData);
  }

  signup(userData: {}) {
    return this.http.post(APP_APIS.AUTH.signup, userData);
  }

  logOut() {
    localStorage.clear();
    this.isLoggedIn$.next(false); 
    this.router.navigateByUrl('/login');
  }

  decodeToken(token: string): boolean | void {
    try {
      const userId = (jwtDecode(token) as { id: string })?.id;
      localStorage.setItem(STORED_KEYS.USER_ID, userId);
      this.isLoggedIn$.next(true); 
      return true;
    } catch {
      this.logOut();
    }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(STORED_KEYS.USER_TOKEN);
  }

  setEmailVerify(userData: {}): Observable<any> {
    return this.http.post(`${environment.baseUrl}auth/forgotPasswords`, userData);
  }

  setCodeVerify(userData: {}): Observable<any> {
    return this.http.post(`${environment.baseUrl}auth/verifyResetCode`, userData);
  }

  resetPass(userData: {}): Observable<any> {
    return this.http.put(`${environment.baseUrl}auth/resetPassword`, userData);
  }

  forgotPassword(email: string) {
  return this.http.post(
    `${environment.baseUrl}auth/forgotPasswords`,
    { email }
  );
}


changePassword(userData: any): Observable<IAuthResponse> {
  return this.http.put<IAuthResponse>(
    `${environment.baseUrl}users/changeMyPassword`,
    userData
  );
}

}

