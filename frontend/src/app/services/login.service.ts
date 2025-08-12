import { Injectable } from '@angular/core';
import { ValidationErrors, FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root',
})
export class LoginCheck {
  form!: FormGroup;
  registerForm!: FormGroup;
  emailWarning = '';
  passwordWarning = '';


  public EmailCheck(errors: ValidationErrors | null) {
    this.emailWarning = '';

    if (errors) {
      if (errors['required']) {
        this.emailWarning = 'Email cannot be empty!';
      } else if (errors['pattern'] && errors['email']) {
        this.emailWarning = `Email is incorrect`;
      }
    }
  }

  public PasswordCheck(errors: ValidationErrors | null) {
    this.passwordWarning = '';

    if (errors) {
      if (errors['required']) {
        this.passwordWarning = 'Password cannot be empty!';
      } else if (errors['minlength']) {
        this.passwordWarning = `Password must be at least ${errors['minlength'].requiredLength} characters! (currently ${errors['minlength'].actualLength})`;
      } else if (errors['pattern']) {
        this.passwordWarning = `There must be atleast 1 special character!`;
      }
    }
  }

  public trimFunction(trimValue: FormGroup) {
    Object.keys(trimValue.controls).forEach((key) => {
      const value = trimValue.get(key)?.value || '';
      trimValue
        .get(key)
        ?.setValue(value.trim(), { emitEvent: false });
    });
  }

   public showPass(inputHTML: any) {  
      
      if (inputHTML.type === "password") {
        inputHTML.setAttribute("type", "text");
      } else {
        inputHTML.setAttribute("type", "password");
      }
    }
}
