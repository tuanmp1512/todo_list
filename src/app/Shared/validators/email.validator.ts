import { FormControl } from '@angular/forms';

export class EmailValidator {

  static validEmail(fc: FormControl) {
    const listUser = JSON.parse(localStorage.getItem('listUser')) || [];
    let active = false;
    if (listUser.length > 0) {
      if (fc.value !== '') {
        listUser.map(user => {
          if (fc.value.toLowerCase() === user.email.toLowerCase()) {
            active = true;
          } else {
            return null;
          }
        });
      }
    }
    if (active) {
      return {
        validEmail: true
      };
    } else {
      return null;
    }
  }
}
