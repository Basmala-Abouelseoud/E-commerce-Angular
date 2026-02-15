import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { STORED_KEYS } from '../../../../core/constants/storedKeys';

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
errorMsg: string | null = null;




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



verifyEmailSubmit(): void {

  this.errorMsg = ''; // reset old error

  const emailValue = this.verifyEmail.get('email')?.value;
  this.resetPassword.get('email')?.patchValue(emailValue);

  this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
    next: (res) => {
      console.log(res);
      if (res.statusMsg === 'success') {
        this.step = 2;
      }
    },
    error: (err: HttpErrorResponse) => {
      console.log(err);

      switch (err.status) {
        case 404:
          this.errorMsg = 'This email is not registered';
          break;
        case 500:
          this.errorMsg = 'Server error, try again later';
          break;
        default:
          this.errorMsg = 'Something went wrong';
      }
    }
  });
}




      verifyCodeSubmit():void{
this.authService.setCodeVerify(this.verifyCode.value).subscribe({
  next:(res)=>{
    console.log(res);
    if(res.status === 'Success'){
      this.step =3;
    }
    
  },
error: (err: HttpErrorResponse) => {
  if (err.status === 400) {
    this.errorMsg = 'Invalid verification code';
  } else {
    this.errorMsg = 'Something went wrong';
  }
}

})
   }




         resetPasswordSubmit():void{
this.authService.resetPass(this.resetPassword.value).subscribe({
  next:(res)=>{
    console.log(res);
localStorage.setItem(STORED_KEYS.USER_TOKEN, res.token);
this.authService.decodeToken(res.token);
this.router.navigate(['/home']);


  },
error: () => {
  this.errorMsg = 'Could not reset password';
}

})
   }



  }
