import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { ValidationErrors, FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root',
})
export class RegisterCheck {
  form!: FormGroup;
  registerForm!: FormGroup;
  firstnameWarning = '';
  lastnameWarning = '';
  emailWarning = '';
  phoneWarning = '';
  passwordWarning = '';


  public NameChecker(errors: ValidationErrors | null, key: string) {

    if (key === 'firstname') {
      this.firstnameWarning = '';

      if (errors) {
        
        if (errors['required']) {
          this.firstnameWarning = 'Input cannot be empty!';
        } else if(errors['pattern']) {          
          this.firstnameWarning = 'Input cannot have numbers or special characters!';
        }
      }
    } else {
      this.lastnameWarning = '';

      if (errors) {
        if (errors['required']) {
          this.lastnameWarning = 'Input cannot be empty!';
        }  else if(errors['pattern']) {
          this.lastnameWarning = 'Input cannot have numbers or special characters!';
        }
      }
    }
  }

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

  public PhonenumberCheck(errors: ValidationErrors | null) {
    this.phoneWarning = '';

    if (errors) {
      if (errors['required']) {
        this.phoneWarning = 'Phonenumber cannot be empty!';
      } else if (errors['pattern']) {
        this.phoneWarning = `Only numbers are allowed!`;
      } else if (errors['maxlength']) {
        this.phoneWarning = `Phonenumber cannot exceed ${errors['maxlength'].requiredLength} digits! (currently ${errors['maxlength'].actualLength})`;
      } else if (errors['minlength']) {
        this.phoneWarning = `Phonenumber must be at least ${errors['minlength'].requiredLength} digits! (currently ${errors['minlength'].actualLength})`
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
    console.log(inputHTML.length);
      
      if (inputHTML.type === "password") {
        inputHTML.setAttribute("type", "text");
      } else {
        inputHTML.setAttribute("type", "password");
      }
    }
}
