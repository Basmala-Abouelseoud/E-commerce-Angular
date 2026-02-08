// cart-page.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  imports: [LoadingSpinnerComponent, RouterLink, CurrencyPipe, AsyncPipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  public readonly cartService = inject(CartService);

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cartService.getCart();
  }

  updateProductCount(count: number, productId: string): void {
    this.cartService.updateCount(count, productId);
  }

  deleteProduct(productId: string): void {
    this.cartService.deleteCartProduct(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}