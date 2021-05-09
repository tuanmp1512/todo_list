import { FormControl } from '@angular/forms';

export class UsernameValidator {

  static validUsername(fc: FormControl){
    const listUser = JSON.parse(localStorage.getItem('listUser')) || [];
    let active = false;
    if (listUser.length > 0) {
      if (fc.value !== '') {
        listUser.map(user => {
          if (fc.value.toLowerCase() === user.username.toLowerCase()) {
            active = true;
          } else {
            return null;
          }
        });
      }
    }
    if (active) {
      return {
        validUsername: true
      };
    } else {
      return null;
    }
  }
}
