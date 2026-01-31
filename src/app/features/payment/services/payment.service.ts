import { inject, Injectable } from '@angular/core';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { CartService } from '../../cart/services/cart.service';

export interface Session {
  url: string;
  success_url: string;
  cancel_url: string;
}

export interface IOnlinePaymentResponse {
  status: string;
  session: Session;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends BaseHttp {
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);

  cashPayment(userDetails: {}, cartId: string) {
    this.http
      .post(`${APP_APIS.PAYMENT.cash}/${cartId}`, {
        shippingAddress: userDetails,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/allorders');
          this.cartService.numOfCartItems.next(0);
        },
      });
  }

  onlinePayment(userDetails: {}, cartId: string) {
    const param = new HttpParams().append('url', environment.appUrl);

    this.http
      .post<IOnlinePaymentResponse>(
        `${APP_APIS.PAYMENT.online}/${cartId}`,
        {
          shippingAddress: userDetails,
        },
        {
          params: param,
        },
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          window.location.assign(res.session.url);
        },
      });
  }
}
