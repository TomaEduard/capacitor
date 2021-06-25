import { AbstractControl } from '@angular/forms';

export function confirmPassword(confirmPassControl: AbstractControl) {
  if (!!confirmPassControl.parent && confirmPassControl.parent.get('parola')) {
    const passControl = confirmPassControl.parent.get('parola');
    return passControl.value === confirmPassControl.value ? null : { confirmPassword: true };
  } else {
    return { confirmPassword: true };
  }
}