import { response } from 'express';
import { Component, inject, Input } from '@angular/core';
import { allProducts } from '../../../home/Interfaces/IAllProductsResponse';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../../wishlist/wishlist.service';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICartResponse } from '../../../cart/interfaces/ICartResponse';

@Component({
  selector: 'app-card-products',
  imports: [RouterLink],
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.css',
})
export class CardProductsComponent {
  @Input({ required: true }) prod!: allProducts;

  //injected services
  public readonly cartService = inject(CartService);
  public readonly wishlistService = inject(WishlistService);
  public readonly toastrService = inject(ToastrService);

  isLoading = false;

  toggleWishlist(productId: string) {
    if (this.wishlistService.isInWishlist(productId)) {
      this.wishlistService.removeFromWishlist(productId).subscribe();
    } else {
      this.wishlistService.addToWishlist(productId).subscribe({
        // next:(response) =>{
        // this.wishlistService.numOfWishListItems =  response.data
        // }
      });
    }
  }

  addToCart(productId: string): void {
    this.isLoading = true;

    this.cartService.addToCart(productId).subscribe({
      next: (response) => {
        this.handleSuccessResponse(response);
      },
      error: (error: HttpErrorResponse) => {
        this.handleErrorResponse();
      },
    });
  }

  handleSuccessResponse(response: ICartResponse): void {
    this.cartService.numOfCartItems.next(response.numOfCartItems);
    this.isLoading = false;


    this.toastrService.success('Product Added Successfully!', undefined);
  }

  handleErrorResponse(): void {
    this.toastrService.error('failed to add product!');
  }
}
