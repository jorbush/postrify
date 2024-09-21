import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <form (ngSubmit)="onSubmit()">
      <input
        [(ngModel)]="username"
        name="username"
        placeholder="Username"
        required
      />
      <input
        [(ngModel)]="password"
        name="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
    <button routerLink="/register" class="auth-button">Sign Up</button>
  `,
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.error('Error logging in:', error),
    });
  }
}
