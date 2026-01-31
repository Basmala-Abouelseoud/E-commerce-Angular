import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingSpinnerInterceptor: HttpInterceptorFn = (req, next) => {
  //implement any logic before sending the request

  const spinner = inject(NgxSpinnerService);
  spinner.show('atom');

  return next(req).pipe(

finalize(() =>{
    spinner.hide('atom');
})


  );
};
