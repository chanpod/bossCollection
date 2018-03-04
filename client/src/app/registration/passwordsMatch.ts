import { AbstractControl } from '@angular/forms';

export function ValidateUrl(control: AbstractControl) {
  if (!control.value != ) {
    return { validUrl: true };
  }
  return null;
}