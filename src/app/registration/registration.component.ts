import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Country,
  EmailValidator,
  PasswordValidator,
  ParentErrorStateMatcher,
  UsernameValidator
} from '../Shared/validators';
import { LocalStorageService } from '../Shared/service/localStorage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  accountDetailsForm: FormGroup;
  matchingPasswordsGroup: FormGroup;
  parentErrorStateMatcher = new ParentErrorStateMatcher();

  countries = [
    new Country('HCM', 'Tp.Ho Chi Minh'),
    new Country('HN', 'Ha Noi'),
    new Country('DN', 'Da Nang')
  ];


  validationMessages = {
    phone: [
      { type: 'required', message: 'Phone is required' },
      { type: 'maxlength', message: 'Phone cannot be more than 15 characters long' },
      { type: 'minlength', message: 'Phone must be at least 9 characters long' },
      { type: 'pattern', message: 'Your Phone must contain only numbers' },
      { type: 'validCountryPhone', message: 'Phone incorrect for the country selected' }
    ]
  };

  accountValidationMessages = {
    username: [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 40 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' },
      { type: 'validEmail', message: 'Your email has already been taken' }
    ],
    confirm_password: [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'maxlength', message: 'Username cannot be more than 40 characters long' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ]
  };

  constructor(private fb: FormBuilder,
              private service: LocalStorageService,
              private router: Router) { }

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    // matching passwords validation
    this.matchingPasswordsGroup = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(40),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    // user links form validations
    this.accountDetailsForm = this.fb.group({
      username: new FormControl('', Validators.compose([
       Validators.maxLength(40),
       Validators.minLength(5),
       Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
       UsernameValidator.validUsername,
       Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        EmailValidator.validEmail,
      ])),
      matching_passwords: this.matchingPasswordsGroup,
      country : new FormControl(this.countries[0], Validators.required),

      phone : new FormControl('', {
        validators: Validators.compose([
          Validators.maxLength(15),
          Validators.minLength(9),
          Validators.pattern('^[0-9]+$'),
          Validators.required,
        ])
      })
    });

  }

  onSubmitAccountDetails(value) {
    this.service.registerUser(value);
    this.service.login(value);
    this.router.navigate(['/home']);
    console.log(value);
  }
}
