import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { STORED_KEYS } from '../constants/storedKeys';
import { Router } from '@angular/router';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);
  const router = inject(Router); 


  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        toastrService.error('no internet connection!');
      }
       if (error.status === 401 && !router.url.includes('login')) {
        toastrService.error('Unauthorized!');
          localStorage.removeItem(STORED_KEYS.USER_TOKEN);
  router.navigate(['/login']);
      }

      return throwError(() => error);
    }),
  );
};
