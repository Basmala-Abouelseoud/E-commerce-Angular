import { Auth_Routes } from './features/auth/auth.routes';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { HOME_ROUTES } from './features/home/home.routes';
import { PRODUCTS_ROUTES } from './features/products/products.routes';
import { Categories_Routes } from './features/categories/categories.routes';
import { BRANDS_ROUTES } from './features/brands/brands.routes';
import { ProductsDetailsComponent } from './features/products/pages/products-details/products-details.component';
import { authGuard } from './core/guards/auth-guard';
import { loggedGuard } from './core/guards/logged-guard';
import { CART_ROUTES } from './features/cart/cart.routes';
import { WISHLIST_ROUTES } from './features/wishlist/wishlist.routes';
import { Payment_ROUTES } from './features/payment/payment.routes';
import { ORDERS_ROUTES } from './features/orders/orders.routes';
import { GuestLayoutComponent } from './core/layout/guest-layout/guest-layout.component';
import { ChangePasswordPageComponent } from './features/auth/pages/change-password-page/change-password-page.component';

export const routes: Routes = [
  // ================= AUTH =================
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [loggedGuard],
    children: Auth_Routes,
  },

  // ================= PUBLIC (GUEST + AUTH) =================
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      {
        path: 'home',
        children: HOME_ROUTES,
      },
      {
        path: 'products',
        children: PRODUCTS_ROUTES,
      },
      {
        path: 'categories',
        children: Categories_Routes,
      },
      {
        path: 'brands',
        children: BRANDS_ROUTES,
      },
      {
        path: 'details/:id/:slug',
        component: ProductsDetailsComponent,
        title:'Product Details'
      },
      {
        path: 'details/:id',
        component: ProductsDetailsComponent,
         title:'Product Details'
      },
      {
        path: 'wishlist',
        children: WISHLIST_ROUTES,
      },
    ],
  },

  // ================= AUTH ONLY =================
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'cart',
        children: CART_ROUTES,
      },

      {
        path: 'allorders',
        children: ORDERS_ROUTES,
      },
      {
        path: 'payment/:cartId',
        children: Payment_ROUTES,
      },
       {
      path: 'change-password',
      component: ChangePasswordPageComponent,
       title:'Change Password Page'
    },
    ],
  },

  // ================= NOT FOUND =================
  {
    path: 'not-found',
    loadComponent: () =>
      import('./features/static-pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
      title:'Not Found Page'
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
