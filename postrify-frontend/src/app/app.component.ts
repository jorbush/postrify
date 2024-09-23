import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { HeaderComponent } from './header/header.component';
import { ToastComponent } from './toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ToastComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-toast></app-toast>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  title = 'postrify';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getData().subscribe({
      next: (data) => console.log(data),
      error: (error) => console.error('Error fetching data:', error),
    });
  }
}
