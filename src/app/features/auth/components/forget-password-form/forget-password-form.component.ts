import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password-form',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password-form.component.html',
  styleUrl: './forget-password-form.component.css',
})
export class ForgetPasswordFormComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

step:number =1;




   verifyEmail:FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.required, Validators.email])
   })


  verifyCode:FormGroup = new FormGroup({
    resetCode : new FormControl(null , [Validators.required, Validators.pattern(/^[0-9]{6}$/)])
   })


     resetPassword:FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.required, Validators.email]),
    newPassword:new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
   })



   verifyEmailSubmit():void{

let emailValue =  this.verifyEmail.get('email')?.value

this.resetPassword.get('email')?.patchValue(emailValue)

this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
  next:(res)=>{
    console.log(res);
    if(res.statusMsg === 'success'){
      this.step =2;
    }
    
  },
  error:(err)=>{
    console.log(err);
    
  }
})
   }



      verifyCodeSubmit():void{
this.authService.setCodeVerify(this.verifyCode.value).subscribe({
  next:(res)=>{
    console.log(res);
    if(res.status === 'Success'){
      this.step =3;
    }
    
  },
  error:(err)=>{
    console.log(err);
    
  }
})
   }




         resetPasswordSubmit():void{
this.authService.resetPass(this.resetPassword.value).subscribe({
  next:(res)=>{
    console.log(res);
localStorage.setItem('userToken', res.token);

    this.router.navigate(['/home'])

  },
  error:(err)=>{
    console.log(err);
    
  }
})
   }
}
