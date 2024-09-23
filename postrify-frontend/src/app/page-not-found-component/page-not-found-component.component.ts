import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found-component',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h1>404 Page Not Found 🧐</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  `,
  styles: `
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      }`
})
export class PageNotFoundComponentComponent {

}
