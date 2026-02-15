import { Routes } from "@angular/router";
import { ProductPageComponent } from "./pages/product-page/product-page.component";
import { ProductsDetailsComponent } from "./pages/products-details/products-details.component";

export const PRODUCTS_ROUTES : Routes =[
    {
        path:'',
        component:ProductPageComponent,
        title:'Products Page'
    }
];