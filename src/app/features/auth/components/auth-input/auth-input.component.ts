import { Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-auth-input',
  imports: [],
  templateUrl: './auth-input.component.html',
  styleUrl: './auth-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AuthInputComponent),
    },
  ],
})
export class AuthInputComponent implements ControlValueAccessor {
  value = '';
  disabled = false;
  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj ?? '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @Input() control: AbstractControl | null = null;
  @Input() type = '';
  @Input() id = '';
  @Input() label = '';
}
