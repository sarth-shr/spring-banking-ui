import { AbstractControl } from '@angular/forms';

export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const newPassword = control.get('newPassword');
  const confirmNewPassword = control.get('confirmNewPassword');

  return newPassword &&
    confirmNewPassword &&
    newPassword.value !== confirmNewPassword.value
    ? { misMatch: true }
    : null;
}
