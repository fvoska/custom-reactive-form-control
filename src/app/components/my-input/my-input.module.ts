import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyInputComponent } from './my-input.component';

@NgModule({
  declarations: [MyInputComponent],
  exports: [MyInputComponent],
  imports: [
    CommonModule
  ]
})
export class MyInputModule { }
