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

private wishlistCountSubject = new BehaviorSubject<number>(0);
wishlistCount$ = this.wishlistCountSubject.asObservable();


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

  this.wishlistCountSubject.next(res.count); 
})

    );
  }

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
  const ids = new Set(res.data);
  this.wishlistIdsSubject.next(ids);
  this.wishlistCountSubject.next(ids.size);
})

    );
  }

removeFromWishlist(productId: string) {
    return this.http.delete<WishlistAddResponse>(
      `${this.baseUrl}/${productId}`,
      {
        headers: {
          token: localStorage.getItem(STORED_KEYS.USER_TOKEN)!,
        },
      }
    ).pipe(
tap(() => {
  const currentIds = new Set(this.wishlistIdsSubject.value);
  currentIds.delete(productId);

  this.wishlistIdsSubject.next(currentIds);
  this.wishlistCountSubject.next(currentIds.size); 
})

    );
  }
  // ❤️ for heart color
  isInWishlist(productId: string): boolean {
    return this.wishlistIdsSubject.value.has(productId);
  }
}
