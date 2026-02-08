import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RelatedProductsComponent } from '../../components/related-products/related-products.component';
import { CartService } from '../../../cart/services/cart.service';
import { WishlistService } from '../../../wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { ICartResponse } from '../../../cart/interfaces/ICartResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-products-details',
  imports: [LoadingSpinnerComponent, CommonModule, FormsModule, RelatedProductsComponent],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css',
})
export class ProductsDetailsComponent {
  // ===== INJECTED SERVICES =====
  private readonly activatedRoute   = inject(ActivatedRoute);
  public  readonly productsService  = inject(ProductsService);
  public  readonly viewportScroller = inject(ViewportScroller);
  public  readonly cartService      = inject(CartService);
  public  readonly wishlistService  = inject(WishlistService);
  private readonly authService      = inject(AuthService);
  private readonly toastrService    = inject(ToastrService);

  // ===== STATE =====
  productId!:      string;
  selectedImage:   string = '';
  quantity:        number = 1;
  isLoading:       boolean = false;

  // ===== الـ heart بيتحسب من الـ wishlistService مش من variable ثابتة =====
  get isInWishlist(): boolean {
    return this.productsService.productDetails
      ? this.wishlistService.isInWishlist(this.productsService.productDetails._id)
      : false;
  }

  constructor() {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id')!;
        this.getProductById();
        this.viewportScroller.scrollToPosition([0, 0], { behavior: 'smooth' });
      },
    });
  }

  // ============================================
  // GET PRODUCT
  // ============================================
  getProductById(): void {
    this.productsService.getProductById(this.productId);
  }

  // ============================================
  // QUANTITY
  // ============================================
  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }

  // ============================================
  // ADD TO CART
  // ============================================
  addToCart(): void {
    if (!this.authService.isLoggedIn()) {
      this.showLoginToast();
      return;
    }

    this.isLoading = true;
    const productId = this.productsService.productDetails._id;
    let added = 0;

    // بيكلم الـ API عدد مرات حسب الـ quantity
    const addOnce = () => {
      this.cartService.addToCart(productId).subscribe({
        next: (response: ICartResponse) => {
          this.cartService.numOfCartItems.next(response.numOfCartItems);
          added++;
          if (added < this.quantity) {
            addOnce();
          } else {
            this.isLoading = false;
            this.toastrService.success(`Added ${this.quantity} item(s) to cart ✓`);
            this.quantity = 1; // ترجع الـ quantity للـ 1 بعد الإضافة
          }
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.toastrService.error('Failed to add product!');
        }
      });
    };

    addOnce();
  }

  // ============================================
  // TOGGLE WISHLIST
  // ============================================
  toggleWishlist(): void {
    if (!this.authService.isLoggedIn()) {
      this.showLoginToast();
      return;
    }

    const productId = this.productsService.productDetails._id;

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

  // ============================================
  // LOGIN TOAST
  // ============================================
  private showLoginToast(): void {
    this.toastrService.warning(
      '<a href="/login" style="color:#fff; font-weight:600; text-decoration:underline; cursor:pointer;">Login Now</a>',
      'You are not logged in',
      {
        enableHtml: true,
        timeOut: 5000,
        closeButton: true,
        tapToDismiss: false,
      }
    );
  }
}