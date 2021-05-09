import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) { }

  checkUserLogin() {
    const checkLogin = localStorage.getItem('user') ? true : false;
    return checkLogin;
  }

  logoutUser() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  registerUser() {
    localStorage.removeItem('user');
  }
}
