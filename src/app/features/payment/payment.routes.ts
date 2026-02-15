import { Routes } from "@angular/router";
import { PaymentPageComponent } from "./components/payment-page/payment-page.component";

export const Payment_ROUTES : Routes = [
    {
        path:'',
        component:PaymentPageComponent,
         title:'Payments Page'
    }
]