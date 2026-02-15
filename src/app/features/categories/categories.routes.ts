import { Routes } from "@angular/router";
import { CategoriesPageComponent } from "./pages/categories-page/categories-page.component";

export const Categories_Routes : Routes = [
    {
        path:'',
        component:CategoriesPageComponent,
        title:'Categories Page'
    }
]