import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public form: FormGroup;
  public initialValue = 'some value';

  constructor(private fb: FormBuilder) { }

  public onSubmit(): void {
    console.log(this.form.value);
  }

  public onEnableDisableClick(): void {
    if (this.form.enabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public onBuildFormClick(): void {
    this.form = this.fb.group({
      username: new FormControl(this.initialValue, Validators.required)
    });
  }

  public onDestroyFormClick(): void {
    this.form = null;
  }
}
