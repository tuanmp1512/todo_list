import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  private LIST_USER = 'listUser';
  private USER = 'user';


  registerUser(user) {
    let listUser = this.listUserFromData() || [];
    listUser.push(user);
    localStorage.setItem(this.LIST_USER, JSON.stringify(listUser));
  }

  listUserFromData() {
      return JSON.parse(localStorage.getItem(this.LIST_USER));
  }

  login(user) {
    let listUser = this.listUserFromData() || [];
    if (listUser.length > 0) {
      const userFond = listUser.find(element => element.username === user.username);
      if (userFond !== undefined) {
        if (user.password !== userFond.matching_passwords.password) {
          return 'incorrect password'
        }
      } else {
        return 'User has not registered'
      }
      localStorage.setItem(this.USER, JSON.stringify(userFond));
    } else {
      return 'User has not registered'
    }
  }

  getUserAfterLogin() {
    return JSON.parse(localStorage.getItem(this.USER));
  }

  updateInforUser(userUpdate) {
    let listUser = this.listUserFromData();
    if (listUser.length > 0) {
      const arrTemp = listUser.filter(user => {
        return userUpdate.username !== user.username;
      });
      listUser = arrTemp;
    }
    listUser.push(userUpdate);
    localStorage.setItem(this.USER, JSON.stringify(userUpdate));
    localStorage.setItem(this.LIST_USER, JSON.stringify(listUser));
  }
}
