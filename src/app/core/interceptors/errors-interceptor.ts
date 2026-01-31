import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        toastrService.error('no internet connection!');
      }
       if (error.status === 401) {
        toastrService.error('Unauthorized!');
      }

      return throwError(() => error);
    }),
  );
};
