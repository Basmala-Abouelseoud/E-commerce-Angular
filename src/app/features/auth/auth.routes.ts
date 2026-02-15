import { Routes } from "@angular/router";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { ForgetPasswordPageComponent } from "./pages/forget-password-page/forget-password-page.component";




export const Auth_Routes:Routes=[
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginPageComponent,
title:'Login Page'
    },
    {
        path:'register',
        component:RegisterPageComponent,
        title:'Register Page'
    },
    {
        path:'forget-password',
        component:ForgetPasswordPageComponent,
        title:'Forget Password Page'
    }
]