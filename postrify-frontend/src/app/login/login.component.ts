import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  template: `
    <div class="auth-container">
      <h2>Login</h2>
      <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            [(ngModel)]="username"
            name="username"
            #usernameInput="ngModel"
            placeholder="Enter your username"
            required
            pattern="^[a-zA-Z0-9_]{3,20}$"
          />
          @if (usernameInput.invalid &&
            (usernameInput.dirty || usernameInput.touched)) {
              <div
                class="error-message"
              >
                @if (usernameInput.errors?.['required']) {
                  <span>Username is required.</span>
                }
                @if (usernameInput.errors?.['pattern']) {
                  <span>Username must be 3-20 characters and can only contain letters,
                    numbers and underscores.</span>
                }
              </div>
            }
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            [(ngModel)]="password"
            name="password"
            #passwordInput="ngModel"
            type="password"
            placeholder="Enter your password"
            required
            pattern="^.{6,}$"
          />
          @if (passwordInput.invalid &&
            (passwordInput.dirty || passwordInput.touched)) {
              <div
                class="error-message"
              >
                @if (passwordInput.errors?.['required']) {
                  <span>Password is required.</span>
                }
                @if (passwordInput.errors?.['pattern']) {
                  <span>Password must be at least 6 characters long.</span>
                }
              </div>
            }
        </div>
        <button type="submit" [disabled]="loginForm.invalid">Login</button>
      </form>
      <p>Don't have an account? <a routerLink="/register">Sign Up</a></p>
    </div>
  `,
  styles: [
    `
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
        width: 95%;
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
    `,
  ],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
  ) {}

  onSubmit() {
    if (this.isFormValid()) {
      this.authService.login(this.username, this.password).subscribe({
        next: (data) => {
          console.log(data);
          this.toastService.show('Login successful!', 'success');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error logging in:', error);
          this.toastService.show('Login failed. Please try again.', 'error');
        },
      });
    }
  }

  isFormValid(): boolean {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^.{6,}$/;
    return (
      usernameRegex.test(this.username) && passwordRegex.test(this.password)
    );
  }
}
