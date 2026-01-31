import { Injectable } from '@angular/core';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';
import { STORED_KEYS } from '../../../core/constants/storedKeys';
import { CartDetails, ICartResponse } from '../interfaces/ICartResponse';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService extends BaseHttp {
  userCart!: CartDetails;
  numOfCartItems = new BehaviorSubject<number>(0);

getCart() {
  const token = localStorage.getItem(STORED_KEYS.USER_TOKEN);
  if (!token) return;

  this.http.get<ICartResponse>(APP_APIS.CART.cart)
    .subscribe({
      next: (res) => {
        this.userCart = res.data;
        this.numOfCartItems.next(res.numOfCartItems);
      },
      error: (err) => {
        console.warn('Cart error:', err.status);
      }
    });
}


  addToCart(productId: string) {
    return this.http.post<ICartResponse>(
      APP_APIS.CART.cart,
      { productId: productId }
    );
  }

  updateCount(count: number, productId: string) {
    this.http
      .put<ICartResponse>(
        `${APP_APIS.CART.cart}/${productId}`,
        {
          count: count,
        }
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.userCart = response.data;
        },
      });
  }

  deleteCartProduct(productId: string) {
    this.http
      .delete<ICartResponse>(`${APP_APIS.CART.cart}/${productId}`)

      .subscribe({
        next: (response) => {
          this.userCart = response.data;
        },
      });
  }

  clearCart() {
    this.http
      .delete(APP_APIS.CART.cart)
      .subscribe({
        next: (response) => {
          this.userCart.products = [];
        },
      });
  }
}
