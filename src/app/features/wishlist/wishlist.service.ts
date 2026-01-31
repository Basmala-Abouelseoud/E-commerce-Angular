import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { STORED_KEYS } from '../../core/constants/storedKeys';
import { WishlistAddResponse, WishlistGetResponse } from './Interfaces/IWishlistResponse';

@Injectable({ providedIn: 'root' })
export class WishlistService {

  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/wishlist';

  private wishlistIdsSubject = new BehaviorSubject<Set<string>>(new Set());
  wishlistIds$ = this.wishlistIdsSubject.asObservable();
  numOfWishListItems = 0;



  constructor(private http: HttpClient) {}

  // ✅ GET wishlist
  getWishlist() {
    return this.http.get<WishlistGetResponse>(this.baseUrl, {
      headers: {
        token: localStorage.getItem(STORED_KEYS.USER_TOKEN)!,
      },
    }).pipe(
      tap(res => {
        const ids = new Set<string>();
        res.data.forEach(p => ids.add(p._id));
        this.wishlistIdsSubject.next(ids);
        this.numOfWishListItems = res.count

      })
    );
  }

  // ✅ ADD
  addToWishlist(productId: string) {
    return this.http.post<WishlistAddResponse>(
      this.baseUrl,
      { productId },
      {
        headers: {
          token: localStorage.getItem(STORED_KEYS.USER_TOKEN)!,
        },
      }
    ).pipe(
      tap(res => {
        this.wishlistIdsSubject.next(new Set(res.data));
      })
    );
  }

  // ✅ REMOVE
  removeFromWishlist(productId: string) {
    return this.http.delete<WishlistAddResponse>(
      `${this.baseUrl}/${productId}`,
      {
        headers: {
          token: localStorage.getItem(STORED_KEYS.USER_TOKEN)!,
        },
      }
    ).pipe(
      tap(res => {
        this.wishlistIdsSubject.next(new Set(res.data));
      })
    );
  }

  // ❤️ for heart color
  isInWishlist(productId: string): boolean {
    return this.wishlistIdsSubject.value.has(productId);
  }
}
