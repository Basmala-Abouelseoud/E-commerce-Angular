import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { interval, take } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { AuthInputComponent } from '../auth-input/auth-input.component';
import { STORED_KEYS } from '../../../../core/constants/storedKeys';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, AuthInputComponent, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  // injected services
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  //variables
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  redirectCounter = 3;
  isShowPassword = false;
  loginForm!: FormGroup;

  constructor() {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  submitData(): void {
    if (this.isLoading) return;

    this.loginForm.markAllAsTouched();
    this.errorMessage = '';
    this.successMessage = '';

    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.successMessage = 'Login successfully !';
          this.isLoading = false;

          //Set Token
          const token = response.token;
          localStorage.setItem(STORED_KEYS.USER_TOKEN, token);
          this.authService.decodeToken(token);

          //navigate
          interval(1000)
            .pipe(take(3))
            .subscribe(() => {
              --this.redirectCounter;
              if (this.redirectCounter === 0) {
                this.router.navigateByUrl('/home');
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
