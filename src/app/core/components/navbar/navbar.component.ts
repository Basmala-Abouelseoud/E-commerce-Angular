import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { WishlistService } from '../../../features/wishlist/wishlist.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
 //injected services
 private readonly authService = inject(AuthService)
 public readonly cartService = inject(CartService)
 public readonly wishlistService = inject(WishlistService)


 @Input() isLogin = false;

 logOut():void{
this.authService.logOut();
 }

ngOnInit(): void {
  this.cartService.getCart()
  this.wishlistService.getWishlist()


}
}
