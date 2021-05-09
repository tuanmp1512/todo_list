import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../Shared/service/localStorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  accountDetailsForm: FormGroup;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private service: LocalStorageService, private router: Router) {
    this.accountDetailsForm = this.fb.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  onLogin(value) {
    const message = this.service.login(value);
    if (message !== undefined) {
      this.isLoginFailed = true;
      this.errorMessage = message;
    } else {
      this.router.navigate(['/home']);
    }
    console.log('🚀 ~ file: login.component.ts ~ line 21 ~ LoginComponent ~ onLogin ~ value', value);
  }

}
