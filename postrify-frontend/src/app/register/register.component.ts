import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  template: `
    <div class="auth-container">
      <h2>Register</h2>
      <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            [(ngModel)]="username"
            name="username"
            #usernameInput="ngModel"
            placeholder="Choose a username"
            required
            pattern="^[a-zA-Z0-9_]{3,20}$"
          />
          <div *ngIf="usernameInput.invalid && (usernameInput.dirty || usernameInput.touched)" class="error-message">
            <span *ngIf="usernameInput.errors?.['required']">Username is required.</span>
            <span *ngIf="usernameInput.errors?.['pattern']">Username must be 3-20 characters and can only contain letters, numbers, and underscores.</span>
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            [(ngModel)]="email"
            name="email"
            #emailInput="ngModel"
            type="email"
            placeholder="Enter your email"
            required
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          />
          <div *ngIf="emailInput.invalid && (emailInput.dirty || emailInput.touched)" class="error-message">
            <span *ngIf="emailInput.errors?.['required']">Email is required.</span>
            <span *ngIf="emailInput.errors?.['pattern']">Please enter a valid email address.</span>
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            [(ngModel)]="password"
            name="password"
            #passwordInput="ngModel"
            type="password"
            placeholder="Create a password"
            required
            pattern="^.{6,}$"
          />
          <div *ngIf="passwordInput.invalid && (passwordInput.dirty || passwordInput.touched)" class="error-message">
            <span *ngIf="passwordInput.errors?.['required']">Password is required.</span>
            <span *ngIf="passwordInput.errors?.['pattern']">Password must be at least 6 characters long.</span>
          </div>
        </div>
        <button type="submit" [disabled]="registerForm.invalid">Register</button>
      </form>
      <p>Already have an account? <a routerLink="/login">Login</a></p>
    </div>
  `,
  styles: [`
    .auth-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border-radius: 8px;
      background-color: var(--card-bg);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    h2 {
      text-align: center;
      color: var(--primary-color);
      margin-bottom: 1.5rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--text-color);
    }

    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      background-color: var(--input-bg);
      color: var(--text-color);
    }

    button {
      width: 100%;
      padding: 0.75rem;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: var(--primary-color-hover);
    }

    button:disabled {
      background-color: var(--disabled-color);
      cursor: not-allowed;
    }

    .error-message {
      color: var(--error-color);
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    p {
      text-align: center;
      margin-top: 1rem;
    }

    a {
      color: var(--primary-color);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    @media (max-width: 480px) {
      .auth-container {
        margin: 1rem;
        padding: 1rem;
      }
    }
  `]
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.isFormValid()) {
      this.authService.register(this.username, this.email, this.password).subscribe({
        next: (data) => console.log(data),
        error: (error) => console.error('Error registering:', error),
      });
    }
  }

  isFormValid(): boolean {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^.{6,}$/;
    return usernameRegex.test(this.username) && emailRegex.test(this.email) && passwordRegex.test(this.password);
  }
}
