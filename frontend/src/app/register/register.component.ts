import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterCheck } from '../services/register.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,  
  Validators,
} from '@angular/forms';

//

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  phoneWarning = '';
  passwordWarning = '';
  firstnameWarning = '';
  lastnameWarning = '';
  emailWarning = '';
  registerForm: FormGroup;
  faLockIcon = faLock;

  constructor(private fb: FormBuilder, private registerService: RegisterCheck) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/),
        ],
      ],
      phonenumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
  }

  onSubmit() {
    
    this.registerService.trimFunction(this.registerForm);

    if (this.registerForm.valid) {
      console.log('Form is valid!', this.registerForm.value);
    } else {
      Object.keys(this.registerForm.controls).forEach((key) => {
        const control = this.registerForm.get(key);
        if (key === 'phonenumber') {
          this.registerService.PhonenumberCheck(control?.errors ?? null);
          this.phoneWarning = this.registerService.phoneWarning;
        } else if (key === 'password') {
          this.registerService.PasswordCheck(control?.errors ?? null);
          this.passwordWarning = this.registerService.passwordWarning;
        } else if (key === 'email') {
          this.registerService.EmailCheck(control?.errors ?? null);
          this.emailWarning = this.registerService.emailWarning;
        } else if (key === 'firstname' || key === 'lastname') {
          this.registerService.NameChecker(control?.errors ?? null, key);
          this.firstnameWarning = this.registerService.firstnameWarning;
          this.lastnameWarning = this.registerService.lastnameWarning;
        }
      });
    }
  }

  showPassService(inputHTML: any) {
    this.registerService.showPass(inputHTML);
  }
  
}
