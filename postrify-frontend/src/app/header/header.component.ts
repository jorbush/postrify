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
          @if (isDarkMode) {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              class="icon icon-tabler icons-tabler-filled icon-tabler-moon"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z"
              />
            </svg>
          } @else {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="black"
              class="icon icon-tabler icons-tabler-filled icon-tabler-sun"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 19a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z"
              />
              <path
                d="M18.313 16.91l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.218 -1.567l.102 .07z"
              />
              <path
                d="M7.007 16.993a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z"
              />
              <path
                d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z"
              />
              <path
                d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z"
              />
              <path
                d="M6.213 4.81l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.217 -1.567l.102 .07z"
              />
              <path
                d="M19.107 4.893a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z"
              />
              <path
                d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z"
              />
              <path
                d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z"
              />
            </svg>
          }
        </button>
      </div>
      <a class="logo-container" routerLink="/">
        <img [src]="logoSrc" alt="Postrify Logo" class="logo" />
      </a>
      <div class="auth-container">
        <a routerLink="/login" class="auth-button">Login</a>
      </div>
    </header>
  `,
  styles: [
    `
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem;
        background-color: var(--header-bg);
        color: var(--header-text);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .toggle-container,
      .logo-container,
      .auth-container {
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

      .auth-button:hover {
        background-color: var(--header-text);
        color: var(--header-bg);
      }

      button {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
      }
    `,
  ],
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
    this.logoSrc = this.isDarkMode
      ? 'postrify_logo_dark_nobg.webp'
      : 'postrify_logo_light_nobg.webp';
  }
}
