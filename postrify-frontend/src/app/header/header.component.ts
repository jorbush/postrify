import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header>
      <div class="toggle-container">
        <button (click)="toggleDarkMode()">
          {{ isDarkMode ? '🌞' : '🌚' }}
        </button>
      </div>
      <div class="logo-container">
        <img [src]="logoSrc" alt="Postrify Logo" class="logo">
      </div>
      <div class="auth-container">
        <a routerLink="/login" class="auth-button">Login</a>
        <a routerLink="/register" class="auth-button">Sign Up</a>
      </div>
    </header>
  `,
  styles: [`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: var(--header-bg);
      color: var(--header-text);
    }

    .toggle-container, .logo-container, .auth-container {
      flex: 1;
    }

    .logo-container {
      text-align: center;
    }

    .auth-container {
      text-align: right;
    }

    .logo {
      height: 40px;
    }

    .auth-button {
      margin-left: 1rem;
      padding: 0.5rem 1rem;
      text-decoration: none;
      color: var(--header-text);
      border: 1px solid var(--header-text);
      border-radius: 4px;
    }

    button {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }

    @media (max-width: 600px) {
      header {
        flex-direction: column;
        align-items: center;
      }

      .toggle-container, .logo-container, .auth-container {
        margin-bottom: 1rem;
      }

      .auth-container {
        text-align: center;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  isDarkMode = false;
  logoSrc = 'assets/logo-light.png';

  ngOnInit() {
    this.loadDarkModePreference();
    this.updateLogo();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.saveDarkModePreference();
    this.updateTheme();
    this.updateLogo();
  }

  loadDarkModePreference() {
    const savedMode = localStorage.getItem('darkMode');
    this.isDarkMode = savedMode === 'true';
    this.updateTheme();
  }

  saveDarkModePreference() {
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  updateTheme() {
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  updateLogo() {
    this.logoSrc = this.isDarkMode ? 'postrify_logo_dark_nobg.webp' : 'postrify_logo_light_nobg.webp';
  }
}
