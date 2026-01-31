import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  imports: [ReactiveFormsModule],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css',
})
export class PaymentPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly paymentService = inject(PaymentService);
  private readonly activatedRoute = inject(ActivatedRoute);

  userInfoForm!: FormGroup;
  selectedMethod: 'cash' | 'online' = 'cash';
  cartId!: string;

  constructor() {
    this.initUserInfoForm();
    this.getCartId();
  }

  getCartId(): void {
    this.cartId = this.activatedRoute.snapshot.paramMap.get('cartId') as string;
  }

  initUserInfoForm(): void {
    this.userInfoForm = this.fb.group({
      details: 'details',
      phone: '01010800921',
      city: 'Cairo',
    });
  }

  sendUserInfo(): void {
    console.log(this.userInfoForm.value);
    switch (this.selectedMethod) {
      case 'cash':
        {
          this.payCashOrder();
        }
        break;
      case 'online':
        {
          this.payOnlineOrder();
        }
        break;
    }
  }

  payCashOrder(): void {
    this.paymentService.cashPayment(this.userInfoForm.value, this.cartId);
  }

  
payOnlineOrder(): void {
  this.paymentService.onlinePayment(this.userInfoForm.value, this.cartId);
}
  
}
