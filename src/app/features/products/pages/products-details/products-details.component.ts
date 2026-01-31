import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RelatedProductsComponent } from '../../components/related-products/related-products.component';

@Component({
  selector: 'app-products-details',
  imports: [LoadingSpinnerComponent, CommonModule, FormsModule, RelatedProductsComponent],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css',
})
export class ProductsDetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  public readonly productsService = inject(ProductsService);
  public readonly viewportScroller = inject(ViewportScroller);



  productId!: string;

  constructor() {
    //  this.productId = this.activatedRoute.snapshot.paramMap.get('id')!;

    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id')!;
           this.getProductById();
           this.viewportScroller.scrollToPosition([0,0],{behavior:'smooth'})
      },
    });
  }

  // ngOnInit(): void {
  //   this.getProductById();
  // }

  getProductById(): void {
    this.productsService.getProductById(this.productId);
  }

  selectedImage: string = '';
  quantity: number = 1;
  isInWishlist: boolean = false;

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    // Add your cart logic here
    console.log('Added to cart:', this.quantity);
  }

  toggleWishlist(): void {
    this.isInWishlist = !this.isInWishlist;
  }
}
