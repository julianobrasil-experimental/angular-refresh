import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  type UserDetailsComponentData,
  UserDetailsComponentService,
} from './user-details-component.service';
import { noop } from '../../../helpers/noop';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UserDetailsComponentService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserDetailsComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UserDetailsComponent),
      multi: true,
    }
  ],
  host: {
    'class': 'user-details',
    '(focusout)': '_onTouched?.()'
  }
})
export class UserDetailsComponent implements ControlValueAccessor, Validator {
  @Input()
  set value(v: UserDetailsComponentData | undefined) {
    if (this._form.pristine) {
      this.writeValue(v);
    }
  }

  private _fb = inject(FormBuilder);

  protected _form = this._fb.group<UserDetailsComponentData>({
    name: '',
    email: ''
  })

  /**
   * Keep a reference to the "OnChanged" function provided by angular
   * (ControlValueAccessor)
   */
  private _onChange!: (data: UserDetailsComponentData) => void;

  /**
   * Keep a reference for the 'OnTouched' function provided by angular
   * (ControlValueAccessor)
   */
  _onTouched!: () => void;

  constructor(private _componentService: UserDetailsComponentService) { }

  /** Implements da ControlValueAccessor */
  writeValue(data?: UserDetailsComponentData): void {
    if (data) {
      this._form.patchValue(data);
    } else {
      this._form.setValue({
        name: '',
        email: ''
      })
    }
  }

  /** Implements ControlValueAccessor */
  registerOnChange(fn: (data: UserDetailsComponentData) => void): void {
    this._onChange = fn;
  }

  /** Implements ControlValueAccessor */
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  /** Implements ControlValueAccessor */
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this._form.disable();
    } else {
      this._form.enable();
    }
  }

  /** Implements Validator */
  validate(control: AbstractControl): ValidationErrors {
    throw new Error('Method not implemented.');
  }

  protected _submitForm(formValue: UserDetailsComponentData) {
    this._onChange(formValue);
  }
}
