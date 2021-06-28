import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  constructor(private _authService: AuthService) {
    this._authService.isLoggedIn$.subscribe((data) => {
      this.isLoggedIn = data;
    });
  }

  logout() {
    this._authService.auth(false);
  }
  login() {
    this._authService.auth(true);
  }
}
