import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../wishlist.service';
import { Product } from '../../Interfaces/IWishlistResponse';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-wishlist-pag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist-pag.component.html',
})
export class WishlistPagComponent {

  wishlistProducts: Product[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlistService.getWishlist().subscribe(res => {
      this.wishlistProducts = res.data;
    });
  }

  remove(productId: string) {
    this.wishlistService.removeFromWishlist(productId).subscribe(() => {
      this.wishlistProducts =
        this.wishlistProducts.filter(p => p._id !== productId);
    });
  }
 
}
