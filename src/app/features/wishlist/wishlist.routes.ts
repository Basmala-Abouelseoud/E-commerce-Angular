import { Routes } from "@angular/router";

export const WISHLIST_ROUTES:Routes = [
    {
        path:'',
        loadComponent:() => 
            import('./page/wishlist-pag/wishlist-pag.component').then((m) => m.WishlistPagComponent) ,
    },
];