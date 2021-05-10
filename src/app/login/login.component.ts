import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../Shared/service/localStorage.service';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private localStorageService: LocalStorageService,
              private router: Router, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      email: new FormControl('')
    });
  }

  onLogin(value) {
    // this.router.navigate(['/home']);
    this.loginService.getListUser().subscribe(listUsers => {
      const user = listUsers.find(user => user.email === value.email) || null;
      if (user !== null) {
        this.localStorageService.loginUser(user);
        this.loginService.getListTodo().subscribe(listTodos => {
          const listTodoByUserId = listTodos.filter(todo => todo.userId === user.id) || [];
          if (listTodoByUserId.length > 0) {
            this.localStorageService.saveTodoListByUserId(listTodoByUserId);
          }
        });
        this.router.navigate(['/home']);
      } else {
        this.isLoginFailed = true;
        this.errorMessage = 'email in not existed';
      }
    });
    console.log('🚀 ~ file: login.component.ts ~ line 21 ~ LoginComponent ~ onLogin ~ value', value);
  }

}
