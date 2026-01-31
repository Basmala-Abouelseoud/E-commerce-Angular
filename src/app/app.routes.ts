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

export const routes: Routes = [
//auth
{
    path:'',
    component:AuthLayoutComponent,
    canActivate: [loggedGuard],
    children:Auth_Routes,
},
//user
{
    path:'',
    canActivate:[authGuard],
    component:MainLayoutComponent,
    children:[
        {
            path:'home',
            children:HOME_ROUTES
        },
         {
            path:'products',
            children:PRODUCTS_ROUTES
        },
        
      {
        path:'details/:id/:slug',
        component:ProductsDetailsComponent,
    },{
        path:'details/:id',
        component:ProductsDetailsComponent,
    },
         {
            path:'categories',
            children:Categories_Routes
        },
         {
            path:'brands',
            children:BRANDS_ROUTES
        },
         {
            path:'cart',
            children:CART_ROUTES
        },{
            path:'wishlist',
            children:WISHLIST_ROUTES
        },{
            path:'allorders',
            children:ORDERS_ROUTES
        },{
            path:'payment/:cartId',
            children:Payment_ROUTES
        },
    ]
},

//guest


//not found
{
    path:'not-found',
    loadComponent:() => import('./features/static-pages/not-found/not-found.component').then(m=>m.NotFoundComponent) 
},
{
    path:'**',
    redirectTo:'not-found',

},
];
