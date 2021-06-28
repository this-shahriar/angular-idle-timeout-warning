import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isLoggedIn: boolean = false;
  inactivityMsg: string | null = null;

  constructor(private _authService: AuthService) {
    this._authService.isLoggedIn$.subscribe((data) => (this.isLoggedIn = data));
    this._authService.inactivityMsg$.subscribe(
      (msg) => (this.inactivityMsg = msg)
    );
  }
}
