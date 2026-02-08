import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IAuthResponse } from '../../interfaces/IAuthResponse';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password-page',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password-page.component.html',
  styleUrl: './change-password-page.component.css',
})
export class ChangePasswordPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  changePasswordForm: FormGroup;
  isLoading = false;
  errorMsg = '';
  successMsg = '';

  // Toggle password visibility
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor() {
    this.changePasswordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required, Validators.minLength(6)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatch }
    );
  }

  // Custom validator للتأكد من تطابق كلمات المرور
  passwordsMatch(group: FormGroup) {
    const pass = group.get('password')?.value;
    const rePass = group.get('rePassword')?.value;
    return pass === rePass ? null : { notMatched: true };
  }

  // Toggle password visibility
  togglePasswordVisibility(field: 'current' | 'new' | 'confirm') {
    if (field === 'current') {
      this.showCurrentPassword = !this.showCurrentPassword;
    } else if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  // Get form control for easy access
  get currentPassword() {
    return this.changePasswordForm.get('currentPassword');
  }

  get password() {
    return this.changePasswordForm.get('password');
  }

  get rePassword() {
    return this.changePasswordForm.get('rePassword');
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.authService.changePassword(this.changePasswordForm.value).subscribe({
      next: (res: IAuthResponse) => {
        // تخزين التوكن الجديد
        localStorage.setItem('userToken', res.token);
        localStorage.setItem('userData', JSON.stringify(res.user));

        this.successMsg = 'Password changed successfully!';
        
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Something went wrong, try again';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }}
