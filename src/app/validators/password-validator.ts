import { AbstractControl } from '@angular/forms';

export function PasswordValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const newPassword = control.get('newPassword');
  const confirmNewPassword = control.get('confirmNewPassword');

  if (confirmNewPassword?.hasError('required') || confirmNewPassword?.pristine) {
    return null;
  }

  return newPassword &&
    confirmNewPassword &&
    newPassword.value !== confirmNewPassword.value
    ? { misMatch: true }
    : null;
}
