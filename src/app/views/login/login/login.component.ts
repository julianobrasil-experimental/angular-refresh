import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {
  LoginComponentData,
  LoginComponentService,
} from './login-component.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoginComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LoginComponent),
      multi: true,
    }
  ],
  host: {
    'class': 'app-login',
    '(focusout)': '_onTouched?.()'
  },
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements ControlValueAccessor, Validator {
  /**
   * Keep a reference to the "OnChanged" function provided by angular
   * (ControlValueAccessor)
   */
  private _onChange!: (data: LoginComponentData) => void;

  /**
   * Keep a reference for the 'OnTouched' function provided by angular
   * (ControlValueAccessor)
   */
  _onTouched!: () => void;

  /** Formulário do componente */
  _loginForm: FormGroup = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder,
              private _componentService: LoginComponentService) {}

  /** Implements ControlValueAccessor */
  writeValue(data: LoginComponentData): void {
    throw new Error('Method not implemented.');
  }

  /** Implements ControlValueAccessor */
  registerOnChange(fn: (data: LoginComponentData) => void): void {
    this._onChange = fn;
  }

  /** Implements ControlValueAccessor */
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  /** Implements ControlValueAccessor */
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  /** Implements Validator */
  validate(control: AbstractControl): ValidationErrors {
    throw new Error('Method not implemented.');
  }

  /** Submete o formulário de login */
  onSubmit() {
    if (this._loginForm.invalid) {
      return;
    }
    this._componentService.login({...this._loginForm.value});
  }
}
