import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  private LIST_TODO_BY_USER_ID = 'listToDoByUserId';
  private USER = 'user';

  loginUser(user) {
      localStorage.setItem(this.USER, JSON.stringify(user));
  }

  getUserAfterLogin() {
    return JSON.parse(localStorage.getItem(this.USER));
  }

  saveTodoListByUserId(listTodo) {
    localStorage.setItem(this.LIST_TODO_BY_USER_ID, JSON.stringify(listTodo));
  }

  getTodoListByUserId() {
    return JSON.parse(localStorage.getItem(this.LIST_TODO_BY_USER_ID));
  }
}
