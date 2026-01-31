import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { STORED_KEYS } from '../constants/storedKeys';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  // لو مش cart ولا wishlist → عدي
  if (
    !req.urlWithParams.includes('cart') &&
    !req.urlWithParams.includes('wishlist') &&
    !req.urlWithParams.includes('orders')


  ) {
    return next(req);
  }

  const platform = inject(PLATFORM_ID);

  if (isPlatformBrowser(platform)) {
    const token = localStorage.getItem(STORED_KEYS.USER_TOKEN);
    console.log('TOKEN FROM INTERCEPTOR:', token);


    if (token) {
      req = req.clone({
        setHeaders: { token },
      });
    }
  }

  return next(req);
};
