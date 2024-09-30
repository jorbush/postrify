import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { HeaderComponent } from './components/header/header.component';
import { ToastComponent } from './components/toast/toast.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ToastComponent, FooterComponent],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main class="content">
        <router-outlet></router-outlet>
        <app-toast></app-toast>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [
    `
      .app-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      .content {
        flex: 1;
      }

      app-footer {
        margin-top: auto;
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
