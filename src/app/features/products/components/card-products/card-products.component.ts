import { Component, inject, Input } from '@angular/core';
import { allProducts } from '../../../home/Interfaces/IAllProductsResponse';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { WishlistService } from '../../../wishlist/wishlist.service';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ICartResponse } from '../../../cart/interfaces/ICartResponse';
import { AuthService } from '../../../auth/services/auth.service';
import { DecimalPipe } from '@angular/common';



@Component({
  selector: 'app-card-products',
  imports: [RouterLink,DecimalPipe],
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.css',
})
export class CardProductsComponent {
  @Input({ required: true }) prod!: allProducts;

  // ===== INJECTED SERVICES =====
  public readonly cartService     = inject(CartService);
  public readonly wishlistService = inject(WishlistService);
  public readonly toastrService   = inject(ToastrService);
  public readonly authService     = inject(AuthService);
  private readonly router         = inject(Router);

  isLoading = false;


  // ============================================
  // ADD TO CART
  // ============================================
  addToCart(productId: string): void {
    // لو مش logged in → شو الـ toastr وقف
    if (!this.authService.isLoggedIn()) {
      this.showLoginToast();
      return;
    }

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

  // ============================================
  // HANDLERS
  // ============================================
  handleSuccessResponse(response: ICartResponse): void {
    this.cartService.numOfCartItems.next(response.numOfCartItems);
    this.isLoading = false;
    this.toastrService.success('Product Added Successfully!');
  }

  handleErrorResponse(): void {
    this.isLoading = false; 
    this.toastrService.error('Failed to add product!');
  }

  // ============================================
  // LOGIN TOAST (مع زر يوديه للـ login)
  // ============================================
  private showLoginToast(): void {
    this.toastrService.warning(
      '<a href="/login" style="color:#fff; font-weight:600; text-decoration:underline; cursor:pointer;">Please Login!</a>',
      'Login to add the Item!',
      {
        enableHtml: true,        // عشان الـ <a> يعمل
        timeOut: 5000,
        closeButton: true,
        tapToDismiss: false,     // متفضلش قافل لما يضغط عليه
      }
    );
  }


  toggleWishlist(productId: string): void {
  if (!this.authService.isLoggedIn()) {
    this.showLoginToast();
    return;
  }
if (this.wishlistService.isInWishlist(productId)) {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: () => {
        this.toastrService.warning('Item removed from wishlist');
      },
      error: () => {
        this.toastrService.error('Something went wrong, try again');
      }
    });
  } else {
    this.wishlistService.addToWishlist(productId).subscribe({
      next: () => {
        this.toastrService.success('Added to wishlist successfully ✓');
      },
      error: () => {
        this.toastrService.error('Something went wrong, try again');
      }
    });
  }
}
}