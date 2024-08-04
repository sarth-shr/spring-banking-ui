import { AbstractControl } from '@angular/forms';

export function SpamValidator(control: AbstractControl): { [key: string]: any } | null{
  const spamString = /admin/i.test(control.value);
  return spamString ? { 'spam' : {value: control.value}} : null;
}
