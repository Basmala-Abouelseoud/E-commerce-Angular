import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { interval, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  // injected services
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  //variables
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  redirectCounter = 3;
  registerForm !: FormGroup

  constructor(){
    this.initRegisterForm()
  }

  initRegisterForm(): void{
this.registerForm =this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    password: [
      null,
      [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/)],
    ],
    rePassword: [null, [Validators.required]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  }, {Validators : this.passwordMissMatch});
  }


  passwordMissMatch(registerForm: AbstractControl) {
    const password = registerForm.get('password')?.value;
    const rePassword = registerForm.get('rePassword')?.value;

    if (password === rePassword) {
      return null;
    } else {
      return { passwordMissMatch: true };
    }
  }

  submitData(): void {
    if (this.isLoading) return;

    this.registerForm.markAllAsTouched();
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.signup(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.successMessage = 'account created successfully !';
          this.isLoading = false;

          interval(1000)
            .pipe(take(3))
            .subscribe(() => {
              --this.redirectCounter;
              if (this.redirectCounter === 0) {
                this.router.navigateByUrl('/login');
              }
            });
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = error.error.message;
          this.isLoading = false;
        },
      });
    }
  }
}
