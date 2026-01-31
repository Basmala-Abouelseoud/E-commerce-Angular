import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';
import { STORED_KEYS } from '../../../core/constants/storedKeys';
import { isPlatformBrowser } from '@angular/common';
import { IAllOrdersResponse } from '../interfaces/IAllOrdersResponse';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseHttp {
  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  userOrders!: IAllOrdersResponse[];

  getUserOrders() {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const userId = localStorage.getItem(STORED_KEYS.USER_ID);

      this.http.get<IAllOrdersResponse[]>(`${APP_APIS.ORDERS.orders}/${userId}`).subscribe({
        next: (res) => {
          console.log(res);
          this.userOrders = res.reverse();
        },
      });
    }
  }
}
