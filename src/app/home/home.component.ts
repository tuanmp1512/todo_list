import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LocalStorageService } from '../Shared/service/localStorage.service';
import {
  Country,
  EmailValidator,
  PasswordValidator,
  ParentErrorStateMatcher,
  UsernameValidator
} from '../Shared/validators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  accountDetailsForm: FormGroup;
  matchingPasswordsGroup: FormGroup;
  parentErrorStateMatcher = new ParentErrorStateMatcher();
  isSuccess = false;

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

  constructor(private fb: FormBuilder, private service: LocalStorageService) { }

  ngOnInit() {
    const user = this.service.getUserAfterLogin();
    let element = null;
    this.countries.map(country => {
      if (user.country.iso === country.iso) {
        element = country;
      }
    });
    this.createForms(user);
    this.accountDetailsForm.controls.username.disable();
    this.accountDetailsForm.controls.email.disable();
    this.accountDetailsForm.controls.country.setValue(element);

  }

  createForms(user) {
    // matching passwords validation
    this.matchingPasswordsGroup = new FormGroup({
      password: new FormControl(user.matching_passwords.password, Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(40),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl(user.matching_passwords.confirm_password, Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    // user links form validations
    this.accountDetailsForm = this.fb.group({
      username: new FormControl(user.username, Validators.compose([
       Validators.maxLength(40),
       Validators.minLength(5),
       Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
       UsernameValidator.validUsername,
       Validators.required
      ])),
      email: new FormControl(user.email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        EmailValidator.validEmail,
      ])),
      matching_passwords: this.matchingPasswordsGroup,
      country : new FormControl(this.countries[0],
      Validators.required),
      // new Country(user.country.iso, user.country.name)
      phone : new FormControl(user.phone, {
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
    const user = this.service.getUserAfterLogin();
    value.username = user.username;
    value.email = user.email;
    this.service.updateInforUser(value);
    this.isSuccess = true;
    setTimeout(() => {
      this.isSuccess = false;
    }, 3000);
    console.log(value);
  }
}
