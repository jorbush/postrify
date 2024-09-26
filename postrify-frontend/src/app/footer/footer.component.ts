import { Component, OnInit } from '@angular/core';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="version-date">
        <span>Version: {{ version }}</span> -
        <span>{{ currentDate }}</span>
      </div>
      <div class="social-icons">
        <a href="mailto:jbonetv5@gmail.com" aria-label="Email">
          <img src="icons/mail.svg" alt="Email" />
        </a>
        <a href="https://github.com/jorbush/postrify" target="_blank" aria-label="Repository">
          <img src="icons/repository.svg" alt="Repository" />
        </a>
        <a href="https://github.com/jorbush" target="_blank" aria-label="GitHub">
          <img src="icons/github.svg" alt="GitHub" />
        </a>
        <a href="https://www.linkedin.com/in/jordi-bonet-valiente-69140418b/" target="_blank" aria-label="LinkedIn">
          <img src="icons/linkedin.svg" alt="LinkedIn" />
        </a>
        <a href="https://jorbush-software.com/" target="_blank" aria-label="Portfolio">
          <img src="icons/portfolio.svg" alt="Portfolio" />
        </a>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        text-align: center;
        padding: 1rem;
        background-color: var(--footer-bg);
        color: var(--footer-text);
      }

      .version-date {
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
      }

      .social-icons {
        display: flex;
        justify-content: center;
        gap: 1rem;
      }

      .social-icons a img {
        width: 24px;
        height: 24px;
        transition: transform 0.3s ease;
      }

      .social-icons a:hover img {
        transform: scale(1.2);
      }
    `,
  ],
})
export class FooterComponent implements OnInit {
  version: string = packageJson.version;
  currentDate: string = new Date().toLocaleDateString();

  ngOnInit(): void {}
}
