import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <form (ngSubmit)="onSubmit()">
      <input [(ngModel)]="username" name="username" placeholder="Username" required>
      <input [(ngModel)]="email" name="email" type="email" placeholder="Email" required>
      <input [(ngModel)]="password" name="password" type="password" placeholder="Password" required>
      <button type="submit">Register</button>
    </form>
  `
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.error('Error registering:', error),
    });
  }
}