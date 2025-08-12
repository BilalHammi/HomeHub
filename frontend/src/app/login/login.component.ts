import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { LoginCheck } from '../services/login.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-login',
  imports: [CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['../register/register.component.css',
  './login.component.css']
})
export class LoginComponent {
    phoneWarning = '';
  passwordWarning = '';
  firstnameWarning = '';
  lastnameWarning = '';
  emailWarning = '';
  registerForm: FormGroup;
  faLockIcon = faLock;

  constructor(private fb: FormBuilder, private loginService: LoginCheck) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/),
        ],
      ],
    });
  }

  onSubmit() {
    this.phoneWarning = '';
    this.passwordWarning = '';
    this.firstnameWarning = '';
    this.lastnameWarning = '';
    this.emailWarning = '';

    this.loginService.trimFunction(this.registerForm);

    if (this.registerForm.valid) {
      console.log('Form is valid!', this.registerForm.value);
    } else {
      Object.keys(this.registerForm.controls).forEach((key) => {
        const control = this.registerForm.get(key);
         if (key === 'password') {
          this.loginService.PasswordCheck(control?.errors ?? null);
          this.passwordWarning = this.loginService.passwordWarning;
        } else if (key === 'email') {
          this.loginService.EmailCheck(control?.errors ?? null);
          this.emailWarning = this.loginService.emailWarning;
        } 
      });
    }
  }

  showPassService(inputHTML: any) {
    this.loginService.showPass(inputHTML);
  }
  
}
