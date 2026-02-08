// cart.service.ts
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

  private calculateTotalItems(): number {
    if (!this.userCart || !this.userCart.products) {
      return 0;
    }
    return this.userCart.products.reduce((total, item) => total + item.count, 0);
  }

  private updateCartItemsCount(): void {
    const totalItems = this.calculateTotalItems();
    this.numOfCartItems.next(totalItems);
  }

  getCart() {
    const token = localStorage.getItem(STORED_KEYS.USER_TOKEN);
    if (!token) return;

    this.http.get<ICartResponse>(APP_APIS.CART.cart)
      .subscribe({
        next: (res) => {
          this.userCart = res.data;
          this.updateCartItemsCount();
        },
        error: (err) => {
          console.warn('Cart error:', err.status);
          this.numOfCartItems.next(0);
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
    if (count <= 0) {
      this.deleteCartProduct(productId);
      return;
    }

    this.http
      .put<ICartResponse>(
        `${APP_APIS.CART.cart}/${productId}`,
        {
          count: count,
        }
      )
      .subscribe({
        next: (response) => {
          this.userCart = response.data;
          this.updateCartItemsCount();
        },
        error: (err) => {
          console.error('Error updating count:', err);
        }
      });
  }

  deleteCartProduct(productId: string) {
    this.http
      .delete<ICartResponse>(`${APP_APIS.CART.cart}/${productId}`)
      .subscribe({
        next: (response) => {
          this.userCart = response.data;
          this.updateCartItemsCount();
        },
        error: (err) => {
          console.error('Error deleting product:', err);
        }
      });
  }

  clearCart() {
    this.http
      .delete(APP_APIS.CART.cart)
      .subscribe({
        next: (response) => {
          this.userCart.products = [];
          this.userCart.totalCartPrice = 0;
          this.numOfCartItems.next(0);
        },
        error: (err) => {
          console.error('Error clearing cart:', err);
        }
      });
  }
}