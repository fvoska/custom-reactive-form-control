import { Component, ChangeDetectionStrategy, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MyInputComponent),
    multi: true,
  }]
})
export class MyInputComponent implements ControlValueAccessor {
  @Input() public isPassword = false;

  public disabled$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // tslint:disable-next-line:variable-name
  private _inputValue = '';
  private updateFormValue: (value: string) => void;
  private setFormTouched: () => void;

  public set inputValue(value: string) {
    console.log('setter', value);
    this._inputValue = value;

    console.log('updateFormValue', value);
    this.updateFormValue(value);
  }

  public get inputValue(): string {
    console.log('getter', this._inputValue);

    return this._inputValue;
  }

  public onInput(event: Event): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    console.log('onInput', inputElement.value);

    this.inputValue = inputElement.value;
  }

  public onClick(): void {
    console.log('setFormTouched');

    this.setFormTouched();
  }

  writeValue(value: string): void {
    console.log('writeValue', value);

    /*
      This has to set _inputValue directly instead of setting via getter (`this.inputValue = value;`)
      because the first writeValue (writing of initial form control value) is called before registerOnChange
    */
    this._inputValue = value;
  }

  registerOnChange(onChangeCallback: any): void {
    console.log('registerOnChange');

    this.updateFormValue = onChangeCallback;
  }

  registerOnTouched(onTouchedCallback: any): void {
    console.log('registerOnTouched');

    this.setFormTouched = onTouchedCallback;
  }

  setDisabledState(isDisabled: boolean): void {
    console.log('setDisabledState', isDisabled);

    this.disabled$.next(isDisabled);
  }
}
